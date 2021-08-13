import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'
import fetchRetry from '../../lib/fetchRetry'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'
import startCase from 'lodash/startCase'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/livros`, 5)
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
        <BasicPage title="Livros">
            <div className="flex flex-wrap justify-between">
                { books.map(book => {
                    return(
                        <div key={book.sequenciaProducao} className="flex-grow md:w-1/2 px-4 py-6 border-b-4 border-red-400">
                            <h3 className="py-4"><strong>{book.nomeProducao}</strong></h3>
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
        </BasicPage>
    )
}
