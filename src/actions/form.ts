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

export async function GetFormStats() {
    const user = await currentUser();

    if (!user) {
        throw new Error("user not found");
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits, submissions, submissionRate, bounceRate
    }

}

export async function GetFormContentByUrl(formUrl: string) {
    return await prisma.form.update({
        select: {
            content: true,
        },
        data: {
            visits: {
                increment: 1,
            }
        },
        where: {
            shareURL: formUrl,
        }
    })
}