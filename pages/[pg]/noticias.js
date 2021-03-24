import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import orderBy from 'lodash/orderBy'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/noticias_sigaa`)
    const news_sigaa = await res.json()
    return {
        props: {
            initialNewsSigaa: orderBy(news_sigaa, 'date', 'desc')
        }
    }
}

export default function News({ initialNewsSigaa }) {
    const [newsSigaa, setNewsSigaa] = useState(initialNewsSigaa)
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const {pg} = useRouter().query

    const getMoreNews = async function() {
        setLoading(true)
        setOffset(offset + 10)
        const res = await fetch(`http://localhost:8000/api/v1/publico/${pg}/noticias_sigaa?limit=${offset + 20}&skip=${offset + 10}`)
        const newsToPush = await res.json()
        setNewsSigaa(newsSigaa.concat(newsToPush))
        setLoading(false)
    }

    return(
        <BasicPage title="Notícias">
            <div className="flex flex-wrap justify-between">
                { newsSigaa.map(news => {
                    return(
                        <div key={news.index} className="my-2 w-full flex-grow shadow px-4 py-6 border-b-4 border-blue-400">
                            <h4 className="text-gray-600">{news.date}</h4>
                            <h2 className="text-lg text-gray-700 font-medium hover:underline">{news.title}</h2>
                            <a href={news.url}>Leia mais...</a>
                        </div>
                    )
                })}
            </div>
            {!loading
               ? <button onClick={() => getMoreNews()}type="button" className="w-full my-2 focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50"><FontAwesomeIcon icon={faArrowDown} />{' '}Carregar mais</button>
               : <div className="py-4 w-full flex justify-center"><h1 className="text-xl"><FontAwesomeIcon className="animate-spin" icon={faCircleNotch} /> Carregando...</h1></div>
            }
        </BasicPage>
    )
}