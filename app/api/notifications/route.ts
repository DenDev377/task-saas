import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Anda Belum login." }, { status: 401 });
        }

        const userId = parseInt(session.user.id as string);

        // Ambil 3 worklog terbaru sebagai notif "Log Kerja Baru"
        const recentWorklogs = await prisma.worklog.findMany({
            where: { userId },
            include: { task: { select: { title: true } } },
            orderBy: { createdAt: "desc" },
            take: 3,
        });

        // Ambil 3 tugas yang baru-baru ini diselesaikan
        const recentCompletedTasks = await prisma.task.findMany({
            where: { createdById: userId, completed: true },
            orderBy: { updatedAt: "desc" },
            take: 3,
            select: { id: true, title: true, updatedAt: true }
        });

        // Gabungkan dan format jadi style notifikasi
        const notifications = [
            ...recentWorklogs.map((log) => ({
                id: `wl-${log.id}`,
                type: "worklog",
                message: `Log kerja ${log.hours} jam dicatat`,
                detail: log.task?.title || "Tugas tidak ditemukan",
                time: log.createdAt,
            })),
            ...recentCompletedTasks.map((task) => ({
                id: `tk-${task.id}`,
                type: "task",
                message: `Tugas berhasil diselesaikan`,
                detail: task.title,
                time: task.updatedAt,
            })),
        ]
            // Urutkan dari terbaru ke terlama lalu ambil 5 teratas
            .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
            .slice(0, 5);

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("[NOTIFICATIONS_ERROR]", error);
        return NextResponse.json({ message: "Gagal memuat notifikasi." }, { status: 500 });
    }
}
