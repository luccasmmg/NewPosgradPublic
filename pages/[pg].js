import Layout from '../components/Layout'

export async function getStaticPaths() {
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

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}`)
    const pgData = await res.json()
    return {
        props: {
            pgData
        }
    }
}

export default function PostGraduation({ pgData }) {
    return(
        <Layout>
            <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                <h1 key={pgData.id}>{pgData.name}</h1>
            </div>
        </Layout>
    )
}