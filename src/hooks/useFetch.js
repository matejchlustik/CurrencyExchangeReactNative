import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [shouldRefetch, refetch] = useState({});

    useEffect(() => {
        setIsPending(true);
        const controller = new AbortController();
        async function fetchData() {
            try {
                const res = await fetch(url,
                    {
                        method: "GET",
                        signal: controller.signal,
                    });
                if (!res.ok) {
                    throw new Error("Failed to fetch the data");
                }
                const fetchedData = await res.json();
                setData(fetchedData);
                setIsPending(false);
                setError(null);
            } catch (error) {
                setError(error);
                setIsPending(false);
            }
        }
        fetchData();
        return () => controller.abort();
    }, [url, shouldRefetch])

    return { data, isPending, error, setData, refetch }
}

export default useFetch;
