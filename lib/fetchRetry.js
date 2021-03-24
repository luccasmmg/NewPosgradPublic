export default async function fetchRetry(url, n) {
    const res = await fetch(url)
    if (!res.ok) {
        new Promise(resolve => setTimeout(resolve, 2000))
        return await fetchRetry(url, n - 1);
    }
    return res
};
