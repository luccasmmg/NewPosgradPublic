import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import groupBy from 'lodash/groupBy'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/convenios`)
    const covenants = await res.json()
    const groupedCovenants = groupBy(covenants, (x) => x.finished ? 'finished' : 'unfinished')
    return {
        props: {
            covenants: groupedCovenants
        }
    }
}

function ListOfCovenants({ covenants, title }) {
    return(
        <div>
            <div className="flex justify-center pt-4">
                <h2 className="text-2xl text-red-600">{title}</h2>
            </div>
            {covenants.map(covenant => {
                return(
                    <div key={covenant.id} className="my-2 px-4 py-2 border-b-4 border-red-400">
                        <h3 className="py-2"><strong>Instituição: </strong>{covenant.initials} - {covenant.name}</h3>
                        <h4><strong>Objeto: </strong></h4>
                        <div dangerouslySetInnerHTML={{ __html: covenant.object }} />
                    </div>
                )
            })}
        </div>
    )
}

export default function Covenants({ covenants }) {
    return(
        <BasicPage title="CONVÊNIOS">
            { covenants.finished && 
            <ListOfCovenants covenants={covenants.finished} title="Finalizados" />
            }
            { covenants.unfinished &&
            <ListOfCovenants covenants={covenants.unfinished} title="Finalizados" />
            }
        </BasicPage>
    )
}
