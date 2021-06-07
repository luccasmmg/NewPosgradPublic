import Link from 'next/link'

import orderBy from 'lodash/orderBy'
import BasicPage from '../../components/BasicPage'
import getPgs from '../../lib/getPgs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/lista_noticias_sigaa?all_news=true`)
    const news_sigaa = await res.json()
    return {
        props: {
            newsSigaa: orderBy(news_sigaa, 'date', 'desc')
        }
    }
}

export default function News({ newsSigaa }) {
    const [limit, setLimit] = useState(10)
    const {pg} = useRouter().query
    console.log(newsSigaa.length)
    return(
        <BasicPage title="Notíciass">
            <div className="flex flex-wrap justify-between">
                { newsSigaa.slice(0, limit).map(news => {
                    return(
                        <div key={news.index} className="my-2 w-full flex-grow shadow px-4 py-6 border-b-4 border-red-400">
                            <h4 className="text-gray-600">{news.date}</h4>
                            <h2 className="text-lg text-gray-700 font-medium hover:underline">{news.title}</h2>
                            <Link href={`/${pg}/noticias/${news.index}`}><a>Leia mais...</a></Link>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => setLimit(limit + 10)}type="button" className="w-full my-2 focus:outline-none text-red-600 text-sm py-2.5 px-5 rounded-md border border-red-600 hover:bg-red-50"><FontAwesomeIcon icon={faArrowDown} />{' '}Carregar mais</button>
        </BasicPage>
    )
}
