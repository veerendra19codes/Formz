import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("User not found");
        }

        const forms = await prisma.form.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "desc",
            }
        })

        if (!forms) {
            return NextResponse.json({ message: "Forms not found" })
        }
        return NextResponse.json({ message: "Forms found", forms });

    } catch (error) {
        console.log("error:", error);
        return NextResponse.json({ message: "error in getting user forms" })
    }
}