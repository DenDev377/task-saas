import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }

) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json({ message: "Anda Belum login." }, { status: 401 })
        }
        //ambil id dari url convert to Int
        const resolvedParams = await params;
        const taskId = parseInt(resolvedParams.id);

        //hapus 1 data spesifik 
        await prisma.task.delete({
            where: { id: taskId }
        })

        return NextResponse.json({ message: "Data berhasil Dihapus." }, { status: 200 })
    } catch (error) {
        console.error("ERROR DELETE:", error)
        return NextResponse.json({
            message: "Gagal menghapus data."
        }, { status: 500 })
    }
}
// Fungsi PATCH untuk MENGUBAH / Memperbarui data yang spesifik
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Anda Belum login." }, { status: 401 })
        }

        const resolvedParams = await params;
        const taskId = parseInt(resolvedParams.id);

        // Tangkap data perubahan (status true/false) yang dilempar dari Frontend
        const body = await req.json();
        const { completed } = body;

        // Perbarui data di Database (Prisma)
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                completed: completed,
                // Jika dicentang selesai, status diubah ke COMPLETED. Jika tidak, ke IN_PROGRESS.
                status: completed ? "COMPLETED" : "IN_PROGRESS"
            }
        });

        return NextResponse.json({ message: "Status tugas diperbarui", task: updatedTask }, { status: 200 })
    } catch (error) {
        console.error("ERROR UPDATE TASK:", error)
        return NextResponse.json({ message: "Gagal memperbarui tugas." }, { status: 500 })
    }
}
