import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, name } = body;

        if (!email || !password) {
            return NextResponse.json(
                { meddage: "Email dan password wajib diisi." },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "password minimal 6 karakter." },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique(
            {
                where: { email }
            }
        )
        if (existingUser) {
            return NextResponse.json(
                { message: "Emaol sudah terdaftar." },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null
            }
        })

        return NextResponse.json(
            {
                message: "registrasi berhasil", user: {
                    id: user.id, email: user.email,
                }
            },
            { status: 201 }
        )

    } catch (error) {
        console.error("[REGISTER_ERROR]", error);
        return NextResponse.json(
            { message: "terjadi kesalahan server" },
            { status: 500 }
        )
    }
}