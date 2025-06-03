// app/api/org-members/route.ts
import { githubClient } from '@/lib/githubClient';
import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic'; // disables static caching for this API route
export const revalidate = 43200; 

export async function GET() {
    try {
        let page = 1;
        let allMembers: string[] = [];

        while (true) {
            const data = await githubClient(
                `https://api.github.com/orgs/gpiiltd/members?per_page=100&page=${page}`
            );

            if (!data.length) break;

            
            // allMembers.push(...data);

            allMembers = [...allMembers, ...data.map((m: any) => m.login)];
            // allMembers = [...allMembers, ...data.map((m: any) => m.login)];
            page++;
        }
        console.log('Fetching GitHub members at', new Date().toISOString());

        return NextResponse.json({ members: allMembers, timestamp: new Date().toISOString() });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
