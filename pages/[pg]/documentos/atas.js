import BasicPage from '../../../components/BasicPage'
import DocumentsTable from '../../../components/DocumentsTable'

import getPgs from '../../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/documentos`)
    const documents = await res.json()
    const records = documents.filter(document => document.category === 'records')
    return {
        props: {
            records
        }
    }
}

export default function Records({ records }) {
    return(
        <BasicPage title="ATAs">
            <DocumentsTable documents={records} firstTH="Data" secondTH="Reunião Ordinária/ Extraordinária" />
        </BasicPage>
    )
}