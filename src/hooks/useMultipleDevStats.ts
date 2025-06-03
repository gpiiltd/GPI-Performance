// @/hooks/useMultipleDevStats.ts
import { useEffect, useState } from "react";
import { formatFormDate } from "@/lib/utils";

type DateRange = {
    from?: Date;
    to?: Date;
};

type DevStats = {
    commits: number;
    prsOpened: number;
    prsMerged: number;
    prReviews: number;
    prComments: number;
    linesAdded: number;
    linesDeleted: number;
} | null;

type UseMultipleDevStatsResult = {
    data: { member: string; stats: DevStats }[];
    loading: boolean;
    error?: any;
};

export function useMultipleDevStats(
    members: string[],
    activeRepos: any[],
    dateRange?: DateRange
): UseMultipleDevStatsResult {
    const [data, setData] = useState<{ member: string; stats: DevStats }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    // console.log('members in multiple dev stats file:', members)
    // console.log('active repos in multiple dev stats file:', activeRepos)
    // console.log('dateRange in multiple dev stats file:', dateRange)
    // console.log('data in multiple dev stats file:', data)

    useEffect(() => {
        if (!members.length) {
            setData([]);
            setLoading(false);
            return;
        }
    
        setLoading(true);
        setError(null);
    
        async function fetchAllDevStats() {
            try {
                const response = await fetch("/api/dev-stats", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usernames: members,
                        activeRepos: activeRepos,
                        fromDate: formatFormDate(dateRange?.from),
                        toDate: formatFormDate(dateRange?.to),
                    }),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch stats");
                }
    
                const result = await response.json(); 
                const transformed = result.map((entry: any) => ({
                    member: entry.username,
                    stats: entry.totals,
                }));
    
                setData(transformed);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
    
        fetchAllDevStats();
    }, [members, activeRepos, dateRange]);
    
    return { data, loading, error };
}
