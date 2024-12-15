"use client";

import React from 'react'
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { formSchema, formSchemaType } from '@/schemas/form';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from 'next/navigation';

function CreateFormBtn() {
    const router = useRouter();

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: formSchemaType) {
        try {
            console.log("values:", values);
            const res = await axios.post("/api/createform", {
                values
            })
            console.log("res:", res);
            if (res.status == 200) {
                const formId = res.data.formId;
                // console.log("formId:", formId);
                router.push(`/builder/${formId}`)
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.log("error:", error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
                    <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                    <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
                        Create new Form
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Form
                    </DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </Form>
                <DialogFooter>
                    <Button onClick={
                        form.handleSubmit(onSubmit)
                    }>
                        {form.formState.isSubmitting ? <ImSpinner2 className="animate-spin" /> : <span>Save</span>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default CreateFormBtn
