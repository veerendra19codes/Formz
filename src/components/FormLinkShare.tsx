"use client";

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from '@/hooks/use-toast';
import { ImShare } from 'react-icons/im';

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
    const [mounted, setMounted] = useState(false);

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null; // avoiding windows not defined error
    }

    return (
        <div className="flex flex-grow gap-4 items-center">
            <Input value={shareLink} readOnly />
            <Button className="w-[250px]" onClick={() => {
                navigator.clipboard.writeText(shareLink);
                toast({
                    title: "Copied",
                    description: "Link copied to the clipboard"
                })
            }}>
                <ImShare className="mr-2 size-4" />
                Share Link
            </Button>
        </div>
    )
}

export default FormLinkShare
