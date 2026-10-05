import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Anda belum login!" }, { status: 401 });
        }

        const body = await req.json();
        const { name, avatar, oldPassword, newPassword } = body;

        // Ambil data user saat ini
        const user = await prisma.user.findUnique({
            where: { id: parseInt(session.user.id) }
        });

        if (!user) {
            return NextResponse.json({ message: "User tidak ditemukan!" }, { status: 404 });
        }

        const updateData: any = {};
        
        if (name) updateData.name = name;
        if (avatar) updateData.avatar = avatar;

        // Validasi dan update password jika ada permintaan
        if (oldPassword && newPassword) {
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            
            if (!isPasswordValid) {
                return NextResponse.json({ message: "Password lama salah!" }, { status: 400 });
            }
            
            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ message: "Tidak ada data yang diubah." }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(session.user.id) },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true
                // Sembunyikan password di kembalian
            }
        });

        return NextResponse.json({
            message: "Profil berhasil diperbarui!",
            user: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error("[UPDATE_PROFILE_ERROR]", error);
        return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
    }
}
