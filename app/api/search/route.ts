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

        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q")?.trim() || "";

        if (q.length < 2) {
            return NextResponse.json([]);
        }

        const userId = parseInt(session.user.id as string);

        // Cari tugas yang mengandung kata kunci di titlenya
        const tasks = await prisma.task.findMany({
            where: {
                createdById: userId,
                title: {
                    contains: q,
                }
            },
            select: {
                id: true,
                title: true,
                priority: true,
                completed: true,
                category: true,
            },
            take: 6, // Maksimal 6 hasil
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("[SEARCH_ERROR]", error);
        return NextResponse.json({ message: "Gagal mencari." }, { status: 500 });
    }
}
