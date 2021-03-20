import PublicationList from '../../components/PublicationList'

import getPgs from '../../lib/getPgs'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'
import startCase from 'lodash/startCase'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/artigos`)
    const articles = await res.json()
    const parsedArticles = articles.map(article => mapKeys(article, (v, k) => camelCase(k)))
    return {
        props: {
            articles: orderBy(parsedArticles, 'anoProducao', 'desc')
        }
    }
}

export default function Articles({ articles }) {
    return(
        <PublicationList title="Artigos publicados">
                { articles.map(article => {
                    return(
                        <div key={article.sequenciaProducao} className="py-6 border-b-4 border-blue-400">
                            <h3 className="py-4 text-blue-700 w-full">{article.nomeProducao}</h3>
                            <ul>
                                <li><strong>Ano produção: </strong>{article.anoProducao}</li>
                                <li><strong>ISSN: </strong>{article.issn}</li>
                                <li><strong>Título do periodico ou revista: </strong>{article.tituloPeriodicoRevista}</li>
                                <li><strong>Volume: </strong>{article.volume}</li>
                                <li><strong>Autores: </strong>
                                    <ol>
                                        { article.autores.map(author => (mapKeys(author, (v, k) => camelCase(k)))).map(author => 
                                            (<li className="px-6" key={author.ordemAutoria}>{startCase(camelCase(author.nome))}</li>))}
                                   </ol>
                                </li>
                            </ul>
                        </div>
                    )
                })}
        </PublicationList>
    )
}