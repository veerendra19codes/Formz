import prisma from "@/lib/prisma";
import { formSchema } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // console.log("body:", body);

        const validation = formSchema.safeParse(body.values);

        if (!validation.success) {
            throw new Error("form inputs not valid");
        }

        const user = await currentUser();
        if (!user) {
            throw new Error("User not found");
        }

        const { name, description } = body.values;

        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description
            }
        })

        if (!form) {
            throw new Error("Error in creating new form");
        }
        return NextResponse.json({ message: "success", formId: form.id });

    } catch (error) {
        console.log("error in creating a new form:", error);
        return NextResponse.json({ message: "something went wrong" })
    }
}