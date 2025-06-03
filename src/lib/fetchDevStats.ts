// @/lib/fetchDevStats.ts
import { githubClient, githubClientRaw } from './githubClient';

export interface DevRepoStats {
    repo: string;
    commits: number;
    prsOpened: number;
    prsMerged: number;
    prReviews: number;
    prComments: number;
    linesAdded: number;
    linesDeleted: number;
}

const countMeaningfulChanges = (patch: string) => {
    let additions = 0;
    let deletions = 0;

    const lines = patch.split('\n');
    for (const line of lines) {
        if (line.startsWith('+') && !line.startsWith('+++')) {
            // Added line that is not just whitespace
            if (line.trim().length > 1) additions++;
        }
        if (line.startsWith('-') && !line.startsWith('---')) {
            // Deleted line that is not just whitespace
            if (line.trim().length > 1) deletions++;
        }
    }

    return { additions, deletions };
};

export const paginateGithub = async (url: string) => {
    let results: any[] = [];
    let page = 1;
    while (true) {
        const pageData = await githubClient(`${url}${url.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
        if (!pageData || pageData.length === 0) break;
        results.push(...pageData);
        page++;
    }
    return results;
};

// export const paginateGithub = async (url: string) => {
//     let results: any[] = [];
//     let nextUrl: string | null = url;

//     while (nextUrl) {
//         const response = await githubClientRaw(nextUrl);
//         if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);

//         const data = await response.json();
//         results.push(...(Array.isArray(data.items) ? data.items : data));

//         const linkHeader = response.headers.get('Link');
//         if (linkHeader && linkHeader.includes('rel="next"')) {
//             const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
//             nextUrl = match ? match[1] : null;
//         } else {
//             nextUrl = null;
//         }
//     }

//     return results;
// };


export const fetchDevStatsInRepo = async (
    //   org: string,
    repo: string,
    dev: string,
    since: string,
    until: string
): Promise<DevRepoStats> => {
    const repoFullName = `gpiiltd/${repo}`;

    // 1. Commits by author within date range
    const commits = await paginateGithub(
        `https://api.github.com/repos/${repoFullName}/commits?author=${dev}&since=${since}&until=${until}&per_page=100`
    );

    // console.log(commits)


    // 2. PRs opened by author in date range
    const prsOpened = await githubClient(
        `https://api.github.com/search/issues?q=type:pr+repo:${repoFullName}+author:${dev}+created:${since}..${until}&per_page=100`
    );

    // 3. PRs merged by author in date range
    const prsMerged = await githubClient(
        `https://api.github.com/search/issues?q=type:pr+repo:${repoFullName}+author:${dev}+merged:${since}..${until}&per_page=100`
    );

    let prReviews = 0;
    let prComments = 0;
    let linesAdded = 0;
    let linesDeleted = 0;

    // 4. Fetch all PRs by this dev to get reviews, comments, and diff stats
    // We fetch PRs with state=all to get merged and closed PRs too
    // const pullRequests = await githubClient(
    //     `https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=100`
    // );
    const pullRequests = await paginateGithub(
        `https://api.github.com/repos/${repoFullName}/pulls?state=all`
    );
    // Filter PRs within date range
    const allPRs = pullRequests.filter(
        (pr: any) =>
            new Date(pr.created_at) >= new Date(since) &&
            new Date(pr.created_at) <= new Date(until)
    );

    // Filter PRs authored by dev within date range
    const userPRs = pullRequests.filter(
        (pr: any) =>
            pr.user.login === dev &&
            new Date(pr.created_at) >= new Date(since) &&
            new Date(pr.created_at) <= new Date(until)
    );

    // for (const pr of userPRs) {
    //     // Fetch reviews, comments, and commits in parallel
    //     const [reviews, comments, commitsInPR] = await Promise.all([
    //         githubClient(`${pr.url}/reviews`),
    //         githubClient(`${pr.url}/comments`),
    //         githubClient(`${pr.url}/commits`),
    //     ]);

    //     console.log(reviews.filter((r: any) => r.user?.login === dev))
    //     // console.log(comments)

    //     // prReviews += reviews.length;
    //     // prComments += comments.length;
    //     prReviews += reviews.filter((r: any) => r.user?.login === dev).length;
    //     prComments += comments.filter((c: any) => c.user?.login === dev).length;


    //     // For each commit in the PR, fetch commit details (diffs)
    //     for (const commit of commitsInPR) {
    //         const commitDetails = await githubClient(
    //             `https://api.github.com/repos/${repoFullName}/commits/${commit.sha}`
    //         );

    //         if (commitDetails.files) {
    //             for (const file of commitDetails.files) {
    //                 if (file.patch) {
    //                     const { additions, deletions } = countMeaningfulChanges(file.patch);
    //                     linesAdded += additions;
    //                     linesDeleted += deletions;
    //                 }
    //             }
    //         }
    //     }
    // }

    for (const pr of allPRs) {
        const [reviews, comments] = await Promise.all([
            githubClient(`${pr.url}/reviews`),
            githubClient(`${pr.url}/comments`),
        ]);
    
        prReviews += reviews.filter((r: any) => r.user?.login === dev).length;
        prComments += comments.filter((c: any) => c.user?.login === dev).length;

        // console.log(reviews.filter((r: any) => r.user?.login === dev))
    
        // Count diffs only if dev authored the PR
        if (pr.user.login === dev) {
            const commitsInPR = await githubClient(`${pr.url}/commits`);
    
            for (const commit of commitsInPR) {
                const commitDetails = await githubClient(
                    `https://api.github.com/repos/${repoFullName}/commits/${commit.sha}`
                );
    
                if (commitDetails.files) {
                    for (const file of commitDetails.files) {
                        if (file.patch) {
                            const { additions, deletions } = countMeaningfulChanges(file.patch);
                            linesAdded += additions;
                            linesDeleted += deletions;
                        }
                    }
                }
            }
        }
    }
    

    console.log(
        dev,
        'repo:', repo,
        'commits:', commits.length,
        'prsOpened:', prsOpened.total_count,
        'prsMerged:', prsMerged.total_count,
        'prsReviewed:', prReviews,
        'prComments:', prComments,
        'lines added:', linesAdded,
        'lines Deleted:', linesDeleted,
    )

    return {
        repo,
        commits: commits.length,
        prsOpened: prsOpened.total_count,
        prsMerged: prsMerged.total_count,
        prReviews,
        prComments,
        linesAdded,
        linesDeleted,
    };
};


