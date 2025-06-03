
// hooks/useOrgMembers.ts
import { useEffect, useState } from 'react';

export const useOrgMembers = () => {
    const [members, setMembers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch('/api/org-members');
                const data = await res.json();
                setMembers(data.members || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    return { members, loading };
};

