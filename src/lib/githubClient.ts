

// lib/githubClient.ts (now server-only)
const GITHUB_PAT = process.env.GITHUB_PAT!;
const USER_AGENT = 'GPIPerformanceMetrics/1.0.0';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const githubClient = async (
    url: string,
    attempt = 1,
    onRateLimit?: (info: { waitTime: number; attempt: number }) => void
): Promise<any> => {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${GITHUB_PAT}`,
            Accept: 'application/vnd.github+json',
            'Accept-Encoding': 'gzip',
            'User-Agent': USER_AGENT,
        },
        next: { revalidate: 1800 },
    });

    const remaining = res.headers.get('X-RateLimit-Remaining');
    const limit = res.headers.get('X-RateLimit-Limit');
    const reset = res.headers.get('X-RateLimit-Reset');
    console.log(`[GitHubClient] Rate Limit: ${remaining}/${limit} (resets at ${reset})`);


    if (res.status === 403 && remaining === '0') {
        const now = Math.floor(Date.now() / 1000);
        const waitTime = reset ? (parseInt(reset) - now + 1) * 1000 : attempt * 1000;

        console.warn(`[GitHubClient] Rate limited. Waiting ${waitTime / 1000}s before retry.`);

        if (onRateLimit) {
            onRateLimit({ waitTime, attempt });
        }

        if (attempt <= 3) {
            await sleep(waitTime);
            return githubClient(url, attempt + 1, onRateLimit);
        } else {
            throw new Error(`GitHub API rate limit exceeded after ${attempt} attempts.`);
        }
    }

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`[GitHubClient] Error ${res.status}: ${res.statusText}\n${errorText}`);
        throw new Error(`GitHub API Error ${res.status}: ${res.statusText} - ${errorText}`);
    }

    return res.json();
};


// raw version - JSON not parsed
export const githubClientRaw = async (url: string) => {
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_PAT}`,
            Accept: 'application/vnd.github+json',
        },
    });
};

