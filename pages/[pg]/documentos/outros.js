import BasicPage from '../../../components/BasicPage'
import DocumentsTable from '../../../components/DocumentsTable'

import getPgs from '../../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/documentos`)
    const documents = await res.json()
    const others = documents.filter(document => document.category === 'others')
    return {
        props: {
            others
        }
    }
}

export default function OtherDocuments({ others }) {
    return(
        <BasicPage title="ATAs">
            <DocumentsTable documents={others} firstTH="Ano" secondTH="Título" />
        </BasicPage>
    )
}