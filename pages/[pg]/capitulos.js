import BasicPage from '../../components/BasicPage'

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
        <BasicPage title="CAPÍTULOS DE LIVROS">
            <div className="flex flex-wrap justify-between">
                { chapters.map(chapter => {
                    return(
                        <div key={chapter.nomeProducao} className="flex-grow md:w-1/2 px-4 py-6 border-b-4 border-blue-400">
                            <h3 className="py-4"><strong>{chapter.nomeProducao}</strong></h3>
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
            </div>
        </BasicPage>
    )
}