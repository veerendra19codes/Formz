import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// class UserNotFoundErr extends Error { }

export async function GET() {
    try {
        const user = await currentUser();

        if (!user) {
            // throw new UserNotFoundErr();
            return NextResponse.json({ message: "user not found" })
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

        const visits = stats._sum.visits || 0; // 0 becoz it can be null also
        const submissions = stats._sum.submissions || 0;

        let submissionRate = 0;

        if (visits > 0) {
            submissionRate = (submissions / visits) * 100;
        }

        const bounceRate = 100 - submissionRate;

        return NextResponse.json({
            visits, submissionRate, submissions, bounceRate
        });

    } catch (error) {
        console.log("error in getting form stats:", error);
        return NextResponse.json({ message: "error in getting fetching stats" })
    }


}