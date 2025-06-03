// app/api/dev-stats/route.ts
import { NextResponse } from 'next/server';
import { fetchDevStatsInRepo } from '@/lib/fetchDevStats';

export const revalidate = 1800;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { usernames, activeRepos, fromDate, toDate } = body;

        if (!usernames || !activeRepos || !fromDate || !toDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const results = await Promise.all(
            usernames.map(async (username: string) => {
                const totals = {
                    commits: 0,
                    prsOpened: 0,
                    prsMerged: 0,
                    prReviews: 0,
                    prComments: 0,
                    linesAdded: 0,
                    linesDeleted: 0,
                };

                for (const repo of activeRepos) {
                    try {
                        const stats = await fetchDevStatsInRepo(
                            repo.name,
                            username,
                            fromDate,
                            toDate
                        );
                        
                        
                        // console.log('stats', username, stats)
                        // console.log('repo', repo.name, '-' ,username, stats)
                        // console.log('stats', username, repo.name)

                        totals.commits += stats.commits;
                        totals.prsOpened += stats.prsOpened;
                        totals.prsMerged += stats.prsMerged;
                        totals.prReviews += stats.prReviews;
                        totals.prComments += stats.prComments;
                        totals.linesAdded += stats.linesAdded;
                        totals.linesDeleted += stats.linesDeleted;
                    } catch (repoError) {
                        console.warn(`Failed fetching stats for ${username} in ${repo.name}:`, repoError);
                    }
                }

                // console.log(username, totals)
                return { username, totals };
            })
        );
        // console.log(usernames, results)


        return NextResponse.json(results);
    } catch (err) {
        console.error('Error in /api/dev-stats:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
