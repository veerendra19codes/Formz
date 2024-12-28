"use client";

import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from "react-icons/hi";
import useDesigner from './hooks/useDesigner';
import { UpdateFormContent } from '@/actions/form';
import { toast } from '@/hooks/use-toast';
import { FaSpinner } from 'react-icons/fa';

function SaveFormBtn({ id }: { id: number }) {
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            const JsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, JsonElements);
            toast({
                title: "success",
                description: "Your form has been saved"
            });
        } catch (error) {
            console.log("error:", error);
            toast({
                title: "error",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }
    return (
        <Button variant={"outline"} className="gap-2" disabled={loading} onClick={() => {
            startTransition(updateFormContent);
        }}>
            <HiSaveAs className="size-6" />
            Save
            {loading && <FaSpinner className="animate-spin" />}
        </Button>
    )
}

export default SaveFormBtn