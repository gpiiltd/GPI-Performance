'use client'

import React from "react";
import { DateRange } from "react-day-picker";

import { formatFormDate } from "@/lib/utils";

export function OrgMetrics({ dateRange, activeRepos }: { dateRange?: DateRange, activeRepos: any }) {

    // const { activeRepositories, loading } = useOrgRepos();

    console.log(
        'date range:',
        `${dateRange && (formatFormDate(dateRange.from))}`, '-',
        `${dateRange && (formatFormDate(dateRange.to))}`
    )

    console.log('activeRepositories', activeRepos);

    // if (loading) {
    //   return <div className="w-screen h-screen flex items-center justify-center">Fetching repositories...</div>;
    // } else if (devStatsLoading) {
    //   return <div className="w-screen h-screen flex items-center justify-center">Fetching dev stats...</div>;
    // }

    return (
        <div className="flex-1 h-full w-full">

        </div>
    );
}
