import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'
import startCase from 'lodash/startCase'
import fetchRetry from '../../lib/fetchRetry'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/trabalhos_eventos`, 10)
    const eventWorks = await res.json()
    const parsedEventWorks = eventWorks.map(eventWork => mapKeys(eventWork, (v, k) => camelCase(k)))
    return {
        props: {
            eventWorks: orderBy(parsedEventWorks, 'anoProducao', 'desc')
        }
    }
}

export default function EventWorks({ eventWorks }) {
    return(
        <BasicPage title="Trabalhos apresentados em eventos">
            <div className="flex flex-wrap justify-between">
                { eventWorks.map(eventWork => {
                    return(
                        <div key={eventWork.sequenciaProducao} className="md:w-1/2 px-4 py-6 border-b-4 border-blue-400">
                            <h3 className="py-4"><strong>{eventWork.nomeProducao}</strong></h3>
                            <ul>
                                <li><strong>Ano produção: </strong>{eventWork.anoProducao}</li>
                                <li><strong>Nome Evento: </strong>{eventWork.nomeEvento}</li>
                                <li><strong>País do evento: </strong>{eventWork.paisEvento}</li>
                                <li><strong>País produção: </strong>{eventWork.paisProducao}</li>
                                <li><strong>Título anais: </strong>{eventWork.tituloAnais}</li>
                                <li><strong>Volume: </strong>{eventWork.volume}</li>
                                <li><strong>Autores: </strong>
                                    <ol>
                                        { eventWork.autores.map(author => (mapKeys(author, (v, k) => camelCase(k)))).map(author => 
                                            (<li className="px-6" key={author.ordemAutoria}>{startCase(camelCase(author.nome))}</li>))}
                                   </ol>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </BasicPage>
    )
}