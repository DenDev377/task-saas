import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try{
        const session = await getServerSession(authOptions);
        if(!session?.user?.id){
            return NextResponse.json({
                message:"Anda Belum login."
            },{status:401})
        }

        const userId = parseInt(session.user.id as string)

        //ambil semua worklog

        const worklogs = await prisma.worklog.findMany({
            where: {
                userId: userId
            },
            include: {
                task: true
            },
            orderBy: {
                date: "desc"
            }
        })

        return NextResponse.json(worklogs)
    }catch(error){
        console.error("[GET_WORKLOGS_ERROR]", error)
        return NextResponse.json({
            message: "Gagal mengambil data worklog."
        }, { status: 500 })
    }
}

// POST /api/worklogs
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({
                message: "Anda belum login."
            }, { status: 401 })
        }

        const body = await req.json();
        const { taskId, hours, date, note } = body;

        if (!taskId || !hours || !date) {
            return NextResponse.json({
                message: "Data tidak lengkap."
            }, { status: 400 })
        }

        const newWorklog = await prisma.worklog.create({
            data: {
                taskId: parseInt(taskId),
                userId: parseInt(session.user.id),
                hours: parseFloat(hours),
                date: new Date(date),
                note: note || null
            }
        })

        return NextResponse.json({
            message: "Worklog berhasil ditambahkan!",
            worklog: newWorklog
        }, { status: 201 })
    } catch (error) {
        console.error("[CREATE_WORKLOG_ERROR]", error)
        return NextResponse.json({
            message: "Terjadi kesalahan server"
        }, { status: 500 })
    }
}