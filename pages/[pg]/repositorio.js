import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const resPg = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}`)
    const pg = await resPg.json()

    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/repositorio`)
    const publications = await res.json()
    return {
        props: {
            publications,
            pg
        },
        revalidate: 300,
    }
}

export default function Publications({ publications, pg }) {
    return(
        <BasicPage title={`Repositório ${pg.initials}`}>
            <div className="flex flex-wrap justify-between">
                { publications.map(publication => {
                    return(
                        <div key={publication.link} className="my-2 w-full flex-grow shadow px-4 py-6 border-b-4 border-blue-400">
                            <h2 className="text-lg text-gray-700 font-medium">{publication.title}</h2>
                            <ul>
                                <li className="py-2"><strong>Autores: </strong>{publication.author}</li>
                                <li className="py-2"><strong>Ano: </strong>{publication.year}</li>
                                <li className="py-2"><strong>Link: </strong>{publication.link}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        </BasicPage>
    )
}