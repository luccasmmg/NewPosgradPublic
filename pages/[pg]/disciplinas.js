import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'
import fetchRetry from '../../lib/fetchRetry'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/disciplinas`, 5)
    const syllabus = await res.json()
    const parsedSyllabus = syllabus.map(syllabus => mapKeys(syllabus, (v, k) => camelCase(k)))
    const syllabusGrouped = [
        {'list': orderBy(parsedSyllabus.filter(component => component.disciplinaObrigatoria == true), 'nome'), 'name': 'Obrigatórias'},
        {'list': orderBy(parsedSyllabus.filter(component => component.disciplinaObrigatoria != true), 'nome'), 'name': 'Eletivas'},
    ] 
    return {
        props: {
            syllabus: syllabusGrouped
        }
    }
}

function SyllabusGroup({ components, title }) {
    const thCSS = 'text-center py-3 px-4 uppercase font-semibold text-sm'
    const tdCSS = 'text-center py-3 px-4 text-sm'
    return(
        <>
            <table className="hidden sm:table my-8 rounded-lg w-full table-auto">
                <thead className="rounded-t-lg bg-blue-800 text-white">
                    <tr>
                        <th className="py-4 text-xl uppercase" colSpan="3">{title}</th>
                    </tr>
                    <tr>
                        <th className={thCSS}>Código</th>
                        <th className={thCSS}>Nome</th>
                        <th className={thCSS}>Horas</th>
                    </tr>
                </thead>
                {components.map(component => {
                    return(
                        <tr key={component.codigo}>
                            <td className={tdCSS}>{component.codigo}</td>
                            <td className={tdCSS}>{component.nome}</td>
                            <td className={tdCSS}>{component.cargaHorariaTotal !== 0 ? component.cargaHorariaTotal: 'Não se aplica'}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

function SyllabusList({ components, title }) {
    return(
        <div className="sm:hidden flex-wrap justify-between">
            <div className="w-full bg-blue-900 flex justify-center items-center border-b-4 border-blue-200">
                <h1 className="py-4 text-white text-2xl font-normal">{title}</h1>
            </div>
            { components.map(component => {
                return(
                    <div key={component.name} className="flex-grow px-4 py-6 border-b-4 border-blue-400">
                        <h3 className="py-4"><strong>{component.nome}</strong></h3>
                        <ul>
                            <li><strong>Código: </strong>{component.codigo}</li>
                            <li><strong>Carga Horária Total: </strong>{component.cargaHorariaTotal !== 0 ? component.cargaHorariaTotal: 'Não se aplica'}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default function Books({ syllabus }) {
    return(
        <BasicPage title="DISCIPLINAS">
                { syllabus.map(groupOfComponents => {
                    return(<SyllabusGroup key={groupOfComponents.name} components={groupOfComponents.list} title={groupOfComponents.name} />)
                })}
                { syllabus.map(groupOfComponents => {
                    return(<SyllabusList key={groupOfComponents.name} components={groupOfComponents.list} title={groupOfComponents.name} />)
                })}
        </BasicPage>
    )
}