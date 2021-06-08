import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/impacto`)
    const impact = await res.json()
    return {
        props: {
            impact: impact[0]
        }
    }
}

export default function Impact({ impact }) {
    return(
        <BasicPage title="IMPACTO">
            <div className="flex flex-wrap justify-between">
                <div className="my-2 w-full flex-grow px-4 py-6 border-b-4 border-red-400">
                    <div dangerouslySetInnerHTML={{ __html: impact.body }} />
                </div>
            </div>
        </BasicPage>
    )
}