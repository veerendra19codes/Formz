import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { FaSpinner } from 'react-icons/fa';
import { toast } from '@/hooks/use-toast';
import { PublishForm } from '@/actions/form';
import { useRouter } from 'next/navigation';

function PublishFormBtn({ id }: { id: number }) {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
            await PublishForm(id);
            toast({
                title: "success",
                description: "Your form is now available to the public"
            })
            router.refresh();
        } catch (error) {
            console.log("error:", error);
            toast({
                title: "Error",
                description: "Something went wrong"
            })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
                    <MdOutlinePublish className="size-4" />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can not be undone. After publishing you will not be able to edit this form.
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available to the public and you will be able to collect submission.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={e => {
                        e.preventDefault();
                        startTransition(publishForm);
                    }}>
                        Proceed {loading && <FaSpinner className="animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PublishFormBtn