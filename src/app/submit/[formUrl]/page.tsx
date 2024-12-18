import { GetFormContentByUrl } from '@/actions/form';
import FormContentSubmit from '@/components/FormContentSubmit';
import { FormElementInstance } from '@/components/FormElements';
import React from 'react'

async function SubmitPage({ params, }: { params: Promise<{ formUrl: string }> }) {
    const formUrl = (await params).formUrl;

    const form = await GetFormContentByUrl(formUrl);

    if (!form) {
        throw new Error("form not found");
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];

    return (
        <FormContentSubmit formUrl={formUrl} content={formContent} />
    )
}

export default SubmitPage
