import BasicPage from '../../../components/BasicPage'
import DocumentsTable from '../../../components/DocumentsTable'

import getPgs from '../../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/documentos`)
    const documents = await res.json()
    const regiments = documents.filter(document => document.category === 'regiments')
    return {
        props: {
            regiments
        }
    }
}

export default function Regiments({ regiments }) {
    return(
        <BasicPage title="ATAs">
            <DocumentsTable documents={regiments} firstTH="Ano" secondTH="Título" />
        </BasicPage>
    )
}