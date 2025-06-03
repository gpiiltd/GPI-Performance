// hooks/useOrgRepos.ts
import { useEffect, useState } from 'react';

export interface Repo {
    id: string;
    name: string;
    archived: boolean;
    pushed_at: string;
    full_name: string;
}

// export const useOrgRepos = () => {
//     const [repos, setRepos] = useState<Repo[]>([]);
//     const [activeRepositories, setActiveRepositories] = useState<Repo[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRepos = async () => {
//             try {
//                 let page = 1;
//                 let allRepos: Repo[] = [];

//                 while (true) {
//                     const data = await githubClient(
//                         `https://api.github.com/orgs/gpiiltd/repos?per_page=100&page=${page}`
//                     );

//                     if (!data.length) break;

//                     // allRepos = [...allRepos, ...data.filter((r: Repo) => !r.archived)];
//                     // page++;
//                     const trimmed = data
//                         .filter((r: Repo) => !r.archived)
//                         .map((repo: Repo) => ({
//                             id: repo.id,
//                             name: repo.name,
//                             full_name: repo.full_name,
//                             pushed_at: repo.pushed_at,
//                             archived: repo.archived
//                         }));

//                     allRepos = [...allRepos, ...trimmed];
//                     page++;
//                 }

//                 setRepos(allRepos);

//                 const oneYearAgo = new Date();
//                 oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

//                 const activeRepos = allRepos.filter(repo => {
//                     return new Date(repo.pushed_at) >= oneYearAgo && !repo.archived;
//                 });

//                 setActiveRepositories(activeRepos);
//             } catch (e) {
//                 console.error(e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRepos();
//     }, []);

//     return { repos, activeRepositories, loading };
// };


export const useOrgRepos = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [activeRepositories, setActiveRepositories] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch('/api/org-repos');
                const data: Repo[] = await res.json();

                setRepos(data);

                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

                const activeRepos = data.filter(repo => {
                    return new Date(repo.pushed_at) >= oneYearAgo && !repo.archived;
                });

                setActiveRepositories(activeRepos);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return { repos, activeRepositories, loading };
};
