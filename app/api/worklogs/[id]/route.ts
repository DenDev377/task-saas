import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Anda Belum login." }, { status: 401 });
        }

        const resolvedParams = await params;
        const worklogId = parseInt(resolvedParams.id);

        const body = await req.json();
        const { taskId, hours, date, note } = body;

        // Validasi input dasar
        if (!taskId || !hours || !date) {
            return NextResponse.json({ message: "Data tidak lengkap." }, { status: 400 });
        }

        const updatedWorklog = await prisma.worklog.update({
            where: { id: worklogId },
            data: {
                taskId: parseInt(taskId),
                hours: parseFloat(hours),
                date: new Date(date),
                note: note || null
            }
        });

        return NextResponse.json(updatedWorklog, { status: 200 });
    } catch (error) {
        console.error("ERROR EDIT WORKLOG", error);
        return NextResponse.json({ message: "Gagal mengedit log kerja." }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Anda Belum login." }, { status: 401 });
        }

        const resolvedParams = await params;
        const worklogId = parseInt(resolvedParams.id);

        await prisma.worklog.delete({
            where: { id: worklogId }
        });

        return NextResponse.json({ message: "Data berhasil dihapus." }, { status: 200 });
    } catch (error) {
        console.error("ERROR DELETE WORKLOG:", error);
        return NextResponse.json({ message: "Gagal menghapus log kerja." }, { status: 500 });
    }
}
