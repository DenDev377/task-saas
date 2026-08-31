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