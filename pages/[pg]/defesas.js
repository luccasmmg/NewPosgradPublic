import { useState } from 'react'
import getPgs from '../../lib/getPgs'
import fetchRetry from '../../lib/fetchRetry'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BasicPage from '../../components/BasicPage'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const resExaminingBoards = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/bancas_sigaa/`, 5)
    const examiningBoards = await resExaminingBoards.json()
    const parsedExaminingBoards = examiningBoards.map(examiningBoard => mapKeys(examiningBoard, (v, k) => camelCase(k))).filter(examiningBoard => examiningBoard.titulo)

    return{
        props: {
            initialExaminingBoards: parsedExaminingBoards,
            pg: params.pg
        }
    }
}

export default function ExaminingBoards({ initialExaminingBoards, pg }) {
    const [examiningBoards, setExaminingBoards] = useState(initialExaminingBoards)
    const [loading, setLoading] = useState(false)
    const [full, setFull] = useState(false)
    const [page, setPage] = useState(2)

    const getExaminingBoards = async function() {
        setLoading(true)
        const resExaminingBoards = await fetchRetry(`http://localhost:8000/api/v1/publico/${pg}/bancas_sigaa/?page=${page}`, 5)
        const examiningBoardsToPush = await resExaminingBoards.json()
        const parsedExaminingBoardsToPush = examiningBoardsToPush.map(examiningBoard => mapKeys(examiningBoard, (v, k) => camelCase(k))).filter(examiningBoard => examiningBoard.titulo).filter(examiningBoard => examiningBoard.titulo && examiningBoard.titulo.length < 500)
        setPage(page + 1)
        setExaminingBoards(examiningBoards.concat(parsedExaminingBoardsToPush))
        setLoading(false)
    }

    return(
        <BasicPage title="Defesas de Tese">
            <div className="flex flex-wrap justify-between">
                { examiningBoards.map(examiningBoard => {
                    const date = new Date(examiningBoard.dataDefesa);
                    return(
                        <div key={examiningBoard.idBancaPosGraduacao} className="my-2 w-full flex-grow shadow px-4 py-6 border-b-4 border-red-400">
                            <h2 className="text-lg text-gray-700 font-medium">{examiningBoard.titulo}</h2>
                            <ul>
                                <li className="py-2"><strong>Local: </strong>{examiningBoard.local}</li>
                                <li className="py-2"><strong>Nome do Discente: </strong>{examiningBoard.nomeDiscente}</li>
                                <li className="py-2"><strong>Data da Defesa: </strong>{date.getFullYear()}-{date.getMonth()}-{date.getDay()}</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
            {!loading
               ? <span>{!full && <button onClick={() => getExaminingBoards()}type="button" className="w-full my-2 focus:outline-none text-red-600 text-sm py-2.5 px-5 rounded-md border border-red-600 hover:bg-red-50"><FontAwesomeIcon icon={faArrowDown} />{' '}Carregar mais</button>}</span>
               : <div className="py-4 w-full flex justify-center"><h1 className="text-xl"><FontAwesomeIcon className="animate-spin" icon={faCircleNotch} /> Carregando...</h1></div>
            }
        </BasicPage>
    )
}