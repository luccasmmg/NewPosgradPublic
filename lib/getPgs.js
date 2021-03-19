export default async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/api/v1/publico/')
    const pgs = await res.json()
    const paths = pgs.map(PG => {
        return {
            params: {
                pg: PG.initials.toLowerCase()
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}
