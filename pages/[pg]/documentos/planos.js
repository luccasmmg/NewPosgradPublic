import BasicPage from '../../../components/BasicPage'
import DocumentsTable from '../../../components/DocumentsTable'

import getPgs from '../../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/documentos`)
    const documents = await res.json()
    const plans = documents.filter(document => document.category === 'plans')
    return {
        props: {
            plans
        }
    }
}

export default function Plans({ plans }) {
    return(
        <BasicPage title="Planos">
            <DocumentsTable documents={plans} firstTH="Data de Aprovação" secondTH="Título" />
        </BasicPage>
    )
}