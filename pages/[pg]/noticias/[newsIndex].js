import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BasicPage from '../../../components/BasicPage'

import getPgs from '../../../lib/getPgs'

export async function getStaticPaths() {
    const pgs = await getPgs()
    const paths = await Promise.all(pgs.paths.map(async (pg) => {
        const res = await fetch(`http://localhost:8000/api/v1/publico/${pg.params.pg}/lista_noticias_sigaa?all_news=true`)
        const newsSigaa = await res.json()
        const paths = newsSigaa.map(news => ({ params: {pg: pg.params.pg, newsIndex: news.index.toString()}}))
        return paths
    }))
    return {
        paths: paths[0],
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/noticia_sigaa/${params.newsIndex}`)
    const news = await res.json()
    return {
        props: {
            news
        }
    }
}

export default function News({ news }) {
    return(
        <BasicPage>
            <div className="flex flex-wrap justify-between">
                <div key={news.index} className="my-2 w-full flex-grow px-4 py-6 border-b-4 border-blue-400">
                    <h1 className="text-3xl py-2 text-gray-900">{news.title}</h1>
                    <h4 className="text-gray-600">{news.date}</h4>
                    <div dangerouslySetInnerHTML={{ __html: news.body }} />
                    { news.url &&
                        <a href={news.url}><h5 className="py-2"><FontAwesomeIcon icon={faDownload} />{' '}Baixar arquivo</h5></a>
                    }
                </div>
            </div>
        </BasicPage>
    )
}