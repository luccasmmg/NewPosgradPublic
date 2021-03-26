import BasicPage from '../../../components/BasicPage'
import DocumentsTable from '../../../components/DocumentsTable'

import getPgs from '../../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/documentos`)
    const documents = await res.json()
    const resolutions = documents.filter(document => document.category === 'resolutions')
    return {
        props: {
            resolutions
        }
    }
}

export default function Resolutions({ resolutions }) {
    return(
        <BasicPage title="Resoluções">
            <DocumentsTable documents={resolutions} firstTH="N Resolução" secondTH="Título" />
        </BasicPage>
    )
}