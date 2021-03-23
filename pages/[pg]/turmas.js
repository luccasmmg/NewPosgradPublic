import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare,  faLink } from '@fortawesome/free-solid-svg-icons'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/turmas`)
    const classes = await res.json()
    const parsedClasses = classes.map(_class => mapKeys(_class, (v, k) => camelCase(k)))
    return {
        props: {
            classes: orderBy(parsedClasses, 'nomeComponente')
        }
    }
}

function ClassesGroup({ classes }) {
    const thCSS = 'text-center py-3 px-4 uppercase font-semibold text-sm'
    const tdCSS = 'text-center py-3 px-4 text-sm'
    return(
        <>
            <table className="hidden md:table my-8 rounded-lg w-full table-auto">
                <thead className="rounded-t-lg bg-blue-800 text-white">
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
                    <div key={_class.idTurma} className="flex-grow px-4 py-6 border-b-4 border-blue-400">
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
                                : <li><strong>Docente: </strong>{parsedDocentes[0].nomeDocente}</li>
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default function Classes({ classes }) {
    return(
        <BasicPage title="TURMAS">
                <ClassList classes={classes} />
                <ClassesGroup classes={classes} />
        </BasicPage>
    )
}