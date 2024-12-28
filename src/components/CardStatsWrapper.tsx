"use client";

import { ReactNode, useEffect, useState } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { getFormStats } from "@/actions/form";

function CardStatsWrapper() {
    const [stats, setStats] = useState<DataType>({
        visits: 0,
        submissionRate: 0,
        submissions: 0,
        bounceRate: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getFormStats();
                // console.log("res:", res);
                // TODO setStats 
                const { visits, submissions } = res;

                const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
                const bounceRate = 100 - submissionRate;

                setStats({
                    visits,
                    submissions,
                    submissionRate,
                    bounceRate,
                });

            } catch (error) {
                console.log("error in fetching stats:", error);
            }
        }
        fetchStats();
    }, [])
    return (
        <StatsCards loading={false} data={stats} />
    )
}

export default CardStatsWrapper

interface DataType {
    visits: number;
    submissions: number;
    submissionRate: number;
    bounceRate: number;
}


interface StatsCardsProps {
    data?: DataType;
    loading: boolean;
}

export function StatsCards(props: StatsCardsProps) {
    const { data, loading } = props;

    return (
        <div className="w-full gap-4 grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Visits" icon={<LuView className="text-blue-600" />} helperText="All time form visits" value={data?.visits.toLocaleString() + "%" || "0"} loading={loading} className="shadow-md shadow-blue-600" />

            <StatsCard title="Total Submissions" icon={<FaWpforms className="text-yellow-600" />} helperText="All time form submissions" value={data?.submissions.toLocaleString() + "%" || "0"} loading={loading} className="shadow-md shadow-yellow-600" />

            <StatsCard title="Submissions Rate" icon={<HiCursorClick className="text-green-600" />} helperText="Visits that result in form submission" value={data?.submissionRate.toLocaleString() + "%" || "0"} loading={loading} className="shadow-md shadow-green-600" />

            <StatsCard title="Bounce Rate" icon={<TbArrowBounce className="text-red-600" />} helperText="Visits that leave without interacting" value={data?.bounceRate.toLocaleString() + "%" || "0"} loading={loading} className="shadow-md shadow-red-600" />
        </div>
    )
}

interface StatsCardProps {
    title?: string;
    value?: string;
    helperText?: string;
    className?: string;
    loading?: boolean;
    icon?: ReactNode;
}

export function StatsCard({ title, value, helperText, className, loading, icon }: StatsCardProps) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {loading && <Skeleton><span className="opacity-0">0</span></Skeleton>}
                    {!loading && value}
                </div>
                <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
            </CardContent>
        </Card>
    )
}