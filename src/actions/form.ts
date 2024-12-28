"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { formSchema } from "@/schemas/form";

export async function getFormStats() {
    const user = await currentUser();

    if (!user) {
        // throw new UserNotFoundErr();
        return { message: "user not found", status: 404, visits: 0, submissionRate: 0, submissions: 0, bounceRate: 0 };
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true,
        }
    })
    // console.log('stats', stats);

    const visits = stats._sum.visits || 0; // 0 becoz it can be null also
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits, submissionRate, submissions, bounceRate
    };
}

interface CreateFormProps {
    name: string,
    description?: string,
}

export async function createForm(values: CreateFormProps | undefined) {
    if (values) {

        const validation = formSchema.safeParse(values);

        if (!validation.success) {
            throw new Error("form inputs not valid");
        }

        const user = await currentUser();
        if (!user) {
            throw new Error("User not found");
        }

        const { name, description } = values;

        const form = await prisma.form.create({
            data: {
                userId: user.id,
                name,
                description,
            }
        })

        if (!form) {
            throw new Error("Error in creating new form");
        }
        return { message: "success", formId: form.id };
    }
    else {
        return { message: "error", formId: null }
    }
}

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

export async function SubmitForm(formUrl: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: {
                increment: 1
            },
            FormSubmissions: {
                create: {
                    content
                }
            }
        },
        where: {
            shareURL: formUrl,
            published: true,
        }
    })
}

export async function GetFormWithSubmissions(id: number) {
    const user = await currentUser();

    if (!user) {
        throw new Error("user not found");
    }

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id,
        },
        include: {
            FormSubmissions: true,
        }
    })
}