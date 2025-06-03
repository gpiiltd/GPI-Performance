// app/api/org-repos/route.ts
import { NextResponse } from 'next/server';
import { githubClient } from '@/lib/githubClient';

export const revalidate = 3600;

export async function GET() {
    try {
        let page = 1;
        let allRepos = [];

        while (true) {
            const data = await githubClient(`https://api.github.com/orgs/gpiiltd/repos?per_page=100&page=${page}`);

            console.log('all repos:', data)

            if (!data.length) break;
            allRepos.push(...data);
            page++;
        }

        const trimmedRepos = allRepos
            .filter(repo => !repo.archived)
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                pushed_at: repo.pushed_at,
                archived: repo.archived
            }));
            
        console.log('Fetching GitHub repos at', new Date().toISOString());
        return NextResponse.json(trimmedRepos);
    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        return new NextResponse('Failed to fetch GitHub repos', { status: 500 });
    }
}
