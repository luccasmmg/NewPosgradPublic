import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import groupBy from 'lodash/groupBy'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/participacoes`)
    const participations = await res.json()
    const groupedParticipations = groupBy(participations, (x) => x.category)
    return {
        props: {
            participations: groupedParticipations
        }
    }
}

function ListOfParticipations({ participations, title }) {
    return(
        <div>
            <div className="flex justify-center pt-4">
                <h2 className="text-2xl text-red-600">{title}</h2>
            </div>
            {participations.map(participation => {
                return(
                    <div key={participation.id} className="px-4 py-2 border-b-4 border-red-400">
                        <h3 className="py-2"><strong>Nome: </strong>{participation.title}</h3>
                        <h3 className="py-2"><strong>Localização: </strong>{participation.location}</h3>
                        <h3 className="py-2"><strong>Ano: </strong>{participation.year}</h3>
                        <h4><strong>Descrição: </strong></h4>
                        <p>{participation.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default function Participations({ participations }) {
    return(
        <BasicPage title="Intercâmbios">
            { participations.cooperation_agreement && 
                <ListOfParticipations participations={participations.cooperation_agreement} title="Acordos de Cooperação" />
            }
            { participations.prize && 
                <ListOfParticipations participations={participations.prize} title="Prêmios" />
            }
            { participations.posdoc && 
                <ListOfParticipations participations={participations.posdoc} title="Pós-Graduações" />
            }
            { participations.event && 
                <ListOfParticipations participations={participations.event} title="Eventos" />
            }
            { participations.parternship && 
                <ListOfParticipations participations={participations.parternship} title="Parcerias" />
            }
        </BasicPage>
    )
}
