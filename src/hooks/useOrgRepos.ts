// hooks/useOrgRepos.ts
import { useEffect, useState } from 'react';

export interface Repo {
    id: string;
    name: string;
    archived: boolean;
    pushed_at: string;
    full_name: string;
}

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
