import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({
                message: "Anda belum login!"

            }, { status: 401 })
        };

        const body = await req.json()
        const { title, category, priority, dueDate } = body

        if (!title) {
            return NextResponse.json({
                message: "Judul tugas wajib diisi."
            }, { status: 400 })
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                category,
                priority,
                dueDate: dueDate ? new Date(dueDate) : null,
                createdById: parseInt(session.user.id),
                assigneeId: parseInt(session.user.id),
            }
        })


        return NextResponse.json({
            message: "Tugas berhasil ditambahkan!",
            task: newTask
        }, { status: 201 })
    } catch (error) {
        console.error("[CREATE_TASK_ERROR]", error)
        return NextResponse.json({
            message: "Terjadi kesalahan server"
        }, { status: 500 })
    }
}