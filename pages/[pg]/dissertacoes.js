import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import BASE_URL from '../api/config'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const resPg = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}`)
    const pg = await resPg.json()
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/${pg.courses[0].id}/repositorio_institucional`)
    let initialPublications = []
    try { initialPublications = await res.json() } catch { initialPublications = [] }
    return {
        props: {
            initialPublications,
            pg
        }
    }
}

export default function Publications({ initialPublications, pg }) {
    const [publications, setPublications] = useState(initialPublications)
    const [loading, setLoading] = useState(false)
    const [full, setFull] = useState(false)
    const [offset, setOffset] = useState(0)

    const getPublications = async function() {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/api/v1/publico/${pg.initials}/${pg.courses[0].id}/repositorio_institucional?offset=${offset + 20}`)
        const publicationsToPush = await res.json()
        setOffset(offset + 20)
        publicationsToPush.length == 0 ? setFull(true) : setFull(full)
        setPublications(publications.concat(publicationsToPush))
        setLoading(false)
    }

    return(
        <BasicPage title="Repositório Institucional">
            <div className="flex flex-wrap justify-between">
                { publications.map(publication => {
                    return(
                        <div key={publication.uri} className="my-2 w-full flex-grow shadow px-4 py-6 border-b-4 border-red-400">
                            <h4 className="text-gray-600">{publication.issue_date}</h4>
                            <h2 className="text-lg text-gray-700 font-medium">{publication.title}</h2>
                            <ul>
                                <li className="py-2"><strong>Autores: </strong>{publication.authors}</li>
                                <li className="py-2"><strong>Editora: </strong>{publication.publisher}</li>
                                <li className="py-2"><strong>Citação: </strong>{publication.citation}</li>
                                <li className="py-2"><strong>Palavras chaves: </strong>{publication.keywords}</li>
                            </ul>
                            <p>{publication.portuguese_abstract}</p>
                        </div>
                    )
                })}
            </div>
            {!loading
               ? <span>{!full && <button onClick={() => getPublications()}type="button" className="w-full my-2 focus:outline-none text-red-600 text-sm py-2.5 px-5 rounded-md border border-red-600 hover:bg-red-50"><FontAwesomeIcon icon={faArrowDown} />{' '}Carregar mais</button>}</span>
               : <div className="py-4 w-full flex justify-center"><h1 className="text-xl"><FontAwesomeIcon className="animate-spin" icon={faCircleNotch} /> Carregando...</h1></div>
            }
        </BasicPage>
    )
}
