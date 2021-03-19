import Head from 'next/head'

import Layout from '../../components/Layout'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'
import startCase from 'lodash/startCase'

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/api/v1/publico/')
    const pgs = await res.json()
    const paths = pgs.map(PG => {
        return {
            params: {
                pg: PG.initials.toLowerCase()
            }
        }
    })
    return {
        paths,
        fallback: false
    }
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
        <Layout>
            <Head><title>Artigos</title></Head>
            <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                <div className="w-full flex justify-center">
                    <h1 className="text-blue-900 text-4xl font-normal">Artigos</h1>
                </div>
                { articles.map(article => {
                    return(
                        <div className="py-6">
                            <h3 className="py-4 text-blue-700 w-full" key={article.nomeProducao}>{article.nomeProducao}</h3>
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
            </div>
        </Layout>
    )
}