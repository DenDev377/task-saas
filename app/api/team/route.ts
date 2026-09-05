import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Anda Belum login." }, { status: 401 });
        }

        // Ambil semua user, beserta statistik tugas mereka
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                _count: {
                    select: {
                        assignedTasks: {
                            where: { completed: false }
                        },
                        worklogs: true
                    }
                }
            },
            orderBy: {
                role: 'asc' // Admin first usually if alphabetical, actually role enum is ADMIN/USER
            }
        });

        // Map data agar leih rapi untuk frontend
        const formattedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            activeTasks: user._count.assignedTasks,
            totalWorklogs: user._count.worklogs
        }));

        return NextResponse.json(formattedUsers);
    } catch (error) {
        console.error("[GET_TEAM_ERROR]", error);
        return NextResponse.json({ message: "Gagal memuat tim." }, { status: 500 });
    }
}
