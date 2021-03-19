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
        <PublicationList title="LIVROS">
                { books.map(book => {
                    return(
                        <div className="flex-grow w-full py-6 border-b-4 border-blue-400">
                            <h3 className="py-4 text-blue-700 w-full" key={`${book.nomeProducao}-${book.isbn}`}>{book.nomeProducao}</h3>
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
        </PublicationList>
    )
}