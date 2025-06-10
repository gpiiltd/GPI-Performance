// // @/hooks/useMultipleDevStats.ts
// import { useEffect, useState } from "react";
// import { formatFormDate } from "@/lib/utils";

// type DateRange = {
//     from?: Date;
//     to?: Date;
// };

// type DevStats = {
//     commits: number;
//     prsOpened: number;
//     prsMerged: number;
//     prReviews: number;
//     prComments: number;
//     linesAdded: number;
//     linesDeleted: number;
// } | null;

// type UseMultipleDevStatsResult = {
//     data: { member: string; stats: DevStats }[];
//     loading: boolean;
//     error?: any;
// };

// export function useMultipleDevStats(
//     members: string[],
//     activeRepos: any[],
//     dateRange?: DateRange
// ): UseMultipleDevStatsResult {
//     const [data, setData] = useState<{ member: string; stats: DevStats }[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<any>(null);

//     // console.log('members in multiple dev stats file:', members)
//     // console.log('active repos in multiple dev stats file:', activeRepos)
//     // console.log('dateRange in multiple dev stats file:', dateRange)
//     // console.log('data in multiple dev stats file:', data)

//     useEffect(() => {
//         if (!members.length) {
//             setData([]);
//             setLoading(false);
//             return;
//         }
    
//         setLoading(true);
//         setError(null);
    
//         async function fetchAllDevStats() {
//             try {
//                 const response = await fetch("/api/dev-stats", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         usernames: members,
//                         activeRepos: activeRepos,
//                         fromDate: formatFormDate(dateRange?.from),
//                         toDate: formatFormDate(dateRange?.to),
//                     }),
//                 });
    
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch stats");
//                 }
    
//                 const result = await response.json(); 
//                 const transformed = result.map((entry: any) => ({
//                     member: entry.username,
//                     stats: entry.totals,
//                 }));
    
//                 setData(transformed);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         }
    
//         fetchAllDevStats();
//     }, [members, activeRepos, dateRange]);
    
//     return { data, loading, error };
// }


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

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

function getCacheKey(members: string[], repos: any[], range?: DateRange) {
  const from = formatFormDate(range?.from);
  const to = formatFormDate(range?.to);
  const keyObject = { members, repos, from, to };
  return `devStatsCache:${btoa(JSON.stringify(keyObject))}`;
}

export function useMultipleDevStats(
  members: string[],
  activeRepos: any[],
  dateRange?: DateRange
): UseMultipleDevStatsResult {
  const [data, setData] = useState<{ member: string; stats: DevStats }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!members.length) {
      setData([]);
      setLoading(false);
      return;
    }

    const cacheKey = getCacheKey(members, activeRepos, dateRange);
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const { data: cachedData, timestamp } = JSON.parse(cached);
      const isValid = Date.now() - timestamp < CACHE_DURATION_MS;

      if (isValid) {
        setData(cachedData);
        setLoading(false);
        return;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    async function fetchAllDevStats() {
      setLoading(true);
      setError(null);

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

        if (!response.ok) throw new Error("Failed to fetch stats");

        const result = await response.json();
        const transformed = result.map((entry: any) => ({
          member: entry.username,
          stats: entry.totals,
        }));

        setData(transformed);

        // cache to localStorage
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: transformed, timestamp: Date.now() })
        );
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
