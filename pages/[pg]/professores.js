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
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/professores`)
    const professors = await res.json()
    const parsedProfessors = professors
        .map(professors => mapKeys(professors, (v, k) => camelCase(k)))
        .map(professor => professor.lattes.includes('lattes.cnpq') ? {...professor, lattes: professor.lattes
            .toLowerCase()
            .split(' ')
            .find(element => element.includes('lattes.cnpq'))} : professor)
    return {
        props: {
            professors: orderBy(parsedProfessors, 'nome')
        }
    }
}

function ProfessorsGroup({ professors }) {
    const thCSS = 'text-center py-3 px-4 uppercase font-semibold text-sm'
    const tdCSS = 'text-center py-3 px-4 text-sm'
    return(
        <>
            <table className="my-8 rounded-lg w-full table-auto">
                <thead className="rounded-t-lg bg-blue-800 text-white">
                    <tr>
                        <th className={thCSS}>Nome</th>
                        <th className={thCSS}>Vínculo</th>
                        <th className={thCSS}>Nível</th>
                        <th className={thCSS}>E-Mail</th>
                        <th className={thCSS}>Lattes</th>
                    </tr>
                </thead>
                {professors.map(professor => {
                    return(
                        <tr key={professor.lattes}>
                            <td className={tdCSS}>{professor.name}</td>
                            <td className={tdCSS}>{professor.level}</td>
                            <td className={tdCSS}>{professor.rank}</td>
                            <td className={tdCSS}><a mailto={professor.email}><FontAwesomeIcon icon={faEnvelopeSquare} /></a></td>
                            {professor.lattes.includes('lattes.cnpq') 
                                ? <td className={tdCSS}><a href={!professor.lattes.includes('http://') ? `http://${professor.lattes}` : professor.attes}><FontAwesomeIcon icon={faLink} /></a></td>
                                : <td className={tdCSS}></td>
                            }
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

export default function Books({ professors }) {
    return(
        <BasicPage title="PROFESSORES">
            <ProfessorsGroup professors={professors} />
        </BasicPage>
    )
}