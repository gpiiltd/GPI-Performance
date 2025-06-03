// @/components/shared/devMetrics
'use client'

import React from "react";
import { DateRange } from "react-day-picker";

import { useMultipleDevStats } from "@/hooks/useMultipleDevStats";

export function DevMetrics({ dateRange, activeRepos, members }: { dateRange?: DateRange, activeRepos: any[], members: string[] }) {

    // console.log('members in dev metrics file:', members)
    const { data: allDevStats, loading, error } = useMultipleDevStats(members, activeRepos, dateRange);
    // console.log('allDevStats:', allDevStats)
    if (loading) {
        return <div className="flex items-center justify-center">Fetching dev stats...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error loading dev stats: {error.message}</div>;
    }

    if (!allDevStats.length) {
        return <div>No stats found for this period.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allDevStats.map(({ member, stats }) => (
                <div key={member} className="border p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2 underline">{member}</h3>
                    {stats ? (
                        <ul className="space-y-1">
                            <li>Commits: {stats.commits}</li>
                            <li>PRs Opened: {stats.prsOpened}</li>
                            <li>PRs Merged: {stats.prsMerged}</li>
                            <li>PR Reviews: {stats.prReviews}</li>
                            <li>PR Comments: {stats.prComments}</li>
                            <li>Lines Added: {stats.linesAdded}</li>
                            <li>Lines Deleted: {stats.linesDeleted}</li>
                        </ul>
                    ) : (
                        <div>No stats available for this member.</div>
                    )}
                </div>
            ))}
        </div>
    );
}
