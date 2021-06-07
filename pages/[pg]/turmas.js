import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import fetchRetry from '../../lib/fetchRetry'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/turmas`, 10)
    const classes = await res.json()
    const parsedClasses = classes.map(_class => mapKeys(_class, (v, k) => camelCase(k)))
    return {
        props: {
            initialClasses: orderBy(parsedClasses, 'nomeComponente')
        }
    }
}

function ClassesGroup({ classes }) {
    const thCSS = 'text-center py-3 px-4 uppercase font-semibold text-sm'
    const tdCSS = 'text-center py-3 px-4 text-sm'
    return(
        <>
            <table className="hidden md:table my-8 rounded-lg w-full table-auto">
                <thead className="rounded-t-lg bg-red-800 text-white">
                    <tr>
                        <th className={thCSS}>Código</th>
                        <th className={thCSS}>Nome</th>
                        <th className={thCSS}>Docentes</th>
                        <th className={thCSS}>Horário</th>
                    </tr>
                </thead>
                {classes.map(_class => {
                    const parsedDocentes = _class.docentes.map(docente => mapKeys(docente, (v, k) => camelCase(k))).map(docente => docente.nomeDocente)
                    return(
                        <tr key={_class.idTurma}>
                            <td className={tdCSS}>{_class.codigoComponente}</td>
                            <td className={tdCSS}>{_class.nomeComponente}</td>
                            <td className={tdCSS}>{parsedDocentes.join(',')}</td>
                            <td className={tdCSS}>{_class.descricaoHorario}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

function ClassList({ classes }) {
    return(
        <div className="md:hidden flex-wrap justify-between">
            { classes.map(_class => {
                const parsedDocentes = _class.docentes.map(docente => mapKeys(docente, (v, k) => camelCase(k)))
                return(
                    <div key={_class.idTurma} className="flex-grow px-4 py-6 border-b-4 border-red-400">
                        <h3 className="py-4"><strong>{_class.nomeComponente}</strong></h3>
                        <ul>
                            <li><strong>Código: </strong>{_class.codigoComponente}</li>
                            <li><strong>Horário: </strong>{_class.descricaoHorario}</li>
                            {parsedDocentes.length > 1 ?
                                <li><strong>Docentes: </strong>
                                    <ol>
                                        {parsedDocentes.map(docente => <li>{docente.nomeDocente}</li>)}
                                    </ol>
                                </li>
                                : parsedDocentes.length > 0 ? <li><strong>Docente: </strong>{parsedDocentes[0].nomeDocente}</li> : <span></span>
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

function SearchForm({ updateClasses }) {
    const [year, setYears] = useState(2021)
    return(
        <div className="flex justify-center w-full py-4">
            <form className="shadow">
                <div class="p-6 flex justify-center flex-wrap">
                    <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Pesquisar outros anos</label>
                    <input value={year} onChange={e => setYears(e.target.value)} type="number" name="ano" id="ano" placeholder="2021" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                    <button type="button" onClick={() => updateClasses(year)}class="w-full my-2 focus:outline-none text-red-600 text-sm py-2.5 px-5 rounded-md border border-red-600 hover:bg-blue-50"><FontAwesomeIcon icon={faSearch} />{' '}Pesquisar</button>
                </div>
            </form>
        </div>
    )
}

export default function Classes({ initialClasses }) {
    const [classes, setClasses] = useState(initialClasses)
    const {pg} = useRouter().query

    const updateClasses = async function(value) {
        setClasses('')
        const res = await fetch(`http://localhost:8000/api/v1/publico/${pg}/turmas?year=${value}`)
        const classes = await res.json()
        const parsedClasses = classes.map(_class => mapKeys(_class, (v, k) => camelCase(k)))
        setClasses(parsedClasses)
    }

    return(
        <BasicPage title="TURMAS">
                <SearchForm updateClasses={updateClasses} />
                {classes &&
                    <>
                        <ClassList classes={classes} />
                        <ClassesGroup classes={classes} />
                    </>
                }
                {!classes &&
                    <div className="flex py-24 justify-center">
                        <h1 className="text-3xl"><FontAwesomeIcon className="animate-spin" icon={faCircleNotch} /> Carregando...</h1>
                    </div>
                }
        </BasicPage>
    )
}
