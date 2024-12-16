"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GetForms() {
    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    return await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function GetFormById(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not found");
    }

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })
}

export async function UpdateFormContent(id: number, jsonContent: string) {
    const user = await currentUser();

    if (!user) {
        throw new Error("user not found");
    }

    return await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            content: jsonContent
        }
    })
}

export async function PublishForm(id: number) {
    const user = await currentUser();

    if (!user) {
        throw new Error("user not found")
    }

    return await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            published: true,
        }
    })
}