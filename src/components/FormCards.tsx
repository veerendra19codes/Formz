"use client";

import { toast } from '@/hooks/use-toast';
import { Form } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import Link from 'next/link';
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa';
import { Button } from './ui/button';

function FormCards() {
    const [forms, setForms] = useState<Form[]>([]);
    useEffect(() => {
        const getForms = async () => {
            try {
                const res = await axios.get("/api/getForms");
                console.log("res:", res);
                if (res.status == 200) {
                    setForms(res.data.forms);
                }
                else {
                    toast({
                        title: "Error",
                        description: "You currently have 0 forms",
                        variant: "destructive",
                    })
                }
            } catch (error) {
                console.log("error:", error);
                toast({
                    title: "Error",
                    description: "You currently have 0 forms",
                    variant: "destructive",
                })
            }
        }
        getForms();
    }, [])

    return (
        <>
            {forms.length > 0 && forms?.map((form) => (
                <FormCard key={form.id} form={form} />
            ))}
        </>
    )
}

export default FormCards

function FormCard({ form }: { form: Form }) {
    return <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-between">
                <span className="truncate font-bold">{form.name}</span>
                {form.published && <Badge>Published</Badge>}
                {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
            </CardTitle>
            <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                {formatDistance(form.createdAt, new Date(), {
                    addSuffix: true,
                })}
                {form.published && (
                    <span className="flex items-center gap-2">
                        <LuView className="text-muted-foreground" />
                        <span>{form.visits.toLocaleString()}</span>
                        <FaWpforms className="text-muted-foreground" />
                        <span>{form.submissions.toLocaleString()}</span>
                    </span>
                )}
            </CardDescription>
        </CardHeader>
        <CardContent className="h-[20px] truncate text-sm to-muted-foreground">
            {form.description || "No description"}
        </CardContent>
        <CardFooter>
            {form.published && (
                <Button asChild className="w-full mt-2 text-md gap-4">
                    <Link href={`/forms/${form.id}`}>
                        View Submissions <BiRightArrowAlt /></Link>
                </Button>
            )}
            {!form.published && (
                <Button asChild className="w-full mt-2 text-md gap-4" variant={"secondary"}>
                    <Link href={`/builder/${form.id}`}>
                        Edit form <FaEdit /></Link>
                </Button>
            )}
        </CardFooter>
    </Card>
}