// hooks/useDevStats.ts
import { useEffect, useState } from 'react';
import { Repo } from './useOrgRepos';
import { fetchDevStatsInRepo, DevRepoStats } from '@/lib/fetchDevStats';

export interface DevTotalStats {
    commits: number;
    prsOpened: number;
    prsMerged: number;
    prReviews: number;
    prComments: number;
    linesAdded: number;
    linesDeleted: number;
}

export const useDevStats = (
    dev: string,
    repos: Repo[],
    since: string,
    until: string
) => {
    const [totals, setTotals] = useState<DevTotalStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!repos.length || !dev || !since || !until) return;

        const fetchAll = async () => {
            try {
                const allStats = await Promise.all(
                    repos.map((repo) => fetchDevStatsInRepo(repo.name, dev, since, until))
                );

                const totalStats = allStats.reduce<DevTotalStats>(
                    (acc, stats) => ({
                        commits: acc.commits + stats.commits,
                        prsOpened: acc.prsOpened + stats.prsOpened,
                        prsMerged: acc.prsMerged + stats.prsMerged,
                        prReviews: acc.prReviews + stats.prReviews,
                        prComments: acc.prComments + stats.prComments,
                        linesAdded: acc.linesAdded + stats.linesAdded,
                        linesDeleted: acc.linesDeleted + stats.linesDeleted,
                    }),
                    {
                        commits: 0,
                        prsOpened: 0,
                        prsMerged: 0,
                        prReviews: 0,
                        prComments: 0,
                        linesAdded: 0,
                        linesDeleted: 0,
                    }
                );

                setTotals(totalStats);
            } catch (err) {
                console.error('Failed to fetch dev stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [dev, repos, since, until]);

    return { totals, loading };
};
