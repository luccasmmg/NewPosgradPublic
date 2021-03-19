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
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/livros`)
    const books = await res.json()
    const parsedBooks = books.map(book => mapKeys(book, (v, k) => camelCase(k)))
    return {
        props: {
            books: orderBy(parsedBooks, 'anoProducao', 'desc')
        }
    }
}

export default function Books({ books }) {
    return(
        <Layout>
            <Head><title>Livros</title></Head>
            <div className="w-full px-4 md:px-6 text-xl text-gray-800">
                <div className="w-full flex justify-center items-center">
                    <h1 className="text-blue-900 text-4xl font-normal">Livros</h1>
                </div>
                { books.map(book => {
                    return(
                        <div className="flex-grow w-full py-6">
                            <h3 className="py-4 text-blue-700 w-full" key={book.nomeProducao}>{book.nomeProducao}</h3>
                            <ul>
                                <li><strong>Ano produção: </strong>{book.anoProducao}</li>
                                <li><strong>ISBN: </strong>{book.isbn}</li>
                                <li><strong>Editora: </strong>{book.nomeEditora}</li>
                                <li><strong>Cidade Editora: </strong>{book.cidadeEditora}</li>
                                <li><strong>Autores: </strong>
                                    <ol>
                                        { book.autores.map(author => (mapKeys(author, (v, k) => camelCase(k)))).map(author => 
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