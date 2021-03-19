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
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/capitulos`)
    const chapters = await res.json()
    const parsedChapters = chapters.map(chapter => mapKeys(chapter, (v, k) => camelCase(k)))
    return {
        props: {
            chapters: orderBy(parsedChapters, 'anoProducao', 'desc')
        }
    }
}

export default function Chapters({ chapters }) {
    return(
        <PublicationList title="CAPÍTULOS DE LIVROS">
                { chapters.map(chapter => {
                    return(
                        <div className="flex-grow w-full py-6 border-b-4 border-blue-400">
                            <h3 className="py-4 text-blue-700 w-full" key={`${chapter.nomeProducao}-${chapter.isbn}`}>{chapter.nomeProducao}</h3>
                            <ul>
                                <li><strong>Ano produção: </strong>{chapter.anoProducao}</li>
                                <li><strong>ISBN: </strong>{chapter.isbn}</li>
                                <li><strong>Editora: </strong>{chapter.nomeEditora}</li>
                                <li><strong>Cidade Editora: </strong>{chapter.cidadeEditora}</li>
                                <li><strong>Autores: </strong>
                                    <ol>
                                        { chapter.autores.map(author => (mapKeys(author, (v, k) => camelCase(k)))).map(author => 
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