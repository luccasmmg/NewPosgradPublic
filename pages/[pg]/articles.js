import Layout from '../../components/Layout'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { parse } from 'postcss'

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
            articles: parsedArticles
        }
    }
}

export default function PostGraduation({ articles }) {
    return(
        <Layout>
            <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                { articles.map(article => <h1 className="w-full" key={article.nomeProducao}>{article.nomeProducao}</h1>)}
            </div>
        </Layout>
    )
}