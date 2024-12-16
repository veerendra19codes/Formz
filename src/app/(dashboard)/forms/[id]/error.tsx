"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react'

function ErrorPage({ error }: { error: Error }) {
    useEffect(() => {
        console.error(error);
    }, [error])
    return (
        <div className="flex size-full flex-col items-center justify-center">
            <h1 className="text-destructive text-4xl">Something went wrong</h1>
            <Button asChild>
                <Link href={"/"}>Go back Home</Link>
            </Button>
        </div>
    )
}

export default ErrorPage
