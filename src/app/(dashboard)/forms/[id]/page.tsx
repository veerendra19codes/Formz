import { GetFormById } from '@/actions/form';
import { StatsCard } from '@/components/CardStatsWrapper';
import FormLinkShare from '@/components/FormLinkShare';
import VisitBtn from '@/components/VisitBtn';
import React from 'react'
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';

async function FormDetailPage({ params, }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;
    const form = await GetFormById(Number(id));
    if (!form) {
        throw new Error("Form not found");
    }

    const { visits, submissions } = form;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return (
        <>
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                    <VisitBtn shareUrl={form.shareURL} />
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">
                    <FormLinkShare shareUrl={form.shareURL} />
                </div>
            </div>
            <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
                <StatsCard title="Total Visits" icon={<LuView className="text-blue-600" />} helperText="All time form visits" value={visits.toLocaleString() + "%" || "0"} loading={false} className="shadow-md shadow-blue-600" />

                <StatsCard title="Total Submissions" icon={<FaWpforms className="text-yellow-600" />} helperText="All time form submissions" value={submissions.toLocaleString() + "%" || "0"} loading={false} className="shadow-md shadow-yellow-600" />

                <StatsCard title="Submissions Rate" icon={<HiCursorClick className="text-green-600" />} helperText="Visits that result in form submission" value={submissionRate.toLocaleString() + "%" || "0"} loading={false} className="shadow-md shadow-green-600" />

                <StatsCard title="Bounce Rate" icon={<TbArrowBounce className="text-red-600" />} helperText="Visits that leave without interacting" value={bounceRate.toLocaleString() + "%" || "0"} loading={false} className="shadow-md shadow-red-600" />
            </div>

            <div className="container pt-10">
                <SubmissionsTable id={form.id} />
            </div>
        </>
    )
}

export default FormDetailPage

function SubmissionsTable({ id }: { id: number }) {
    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
        </>
    )
}
