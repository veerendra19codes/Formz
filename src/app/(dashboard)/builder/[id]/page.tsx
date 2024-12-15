import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react'

async function BuilderPage({ params, }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    const form = await GetFormById(Number(id));
    if (!form) {
        throw new Error("Form not found");
    }
    return (
        <div className="size-full flex-grow">
            <FormBuilder form={form} />
        </div>
    )
}

export default BuilderPage
