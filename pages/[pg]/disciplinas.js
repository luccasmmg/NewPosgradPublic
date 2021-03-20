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
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/disciplinas`)
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
            <table className="my-8 rounded-lg table-auto">
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

export default function Books({ syllabus }) {
    return(
        <BasicPage title="DISCIPLINAS">
                { syllabus.map(groupOfComponents => {
                    return(<SyllabusGroup components={groupOfComponents.list} title={groupOfComponents.name} />)
                })}
        </BasicPage>
    )
}