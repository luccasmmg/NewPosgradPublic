import { faAddressBook, faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { useState } from 'react'

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/api/v1/publico/')
    const pgs = await res.json()
    const paths = pgs.map(PG => {
        return {
            params: {
                pg: PG.initials.toLowerCase()
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const resPg = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}`)
    const pgData = await resPg.json()

    const resClasses = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/turmas`)
    const classesData = await resClasses.json()
    return {
        props: {
            pgData,
            classesData: classesData.map(classData => mapKeys(classData, (v, k) => camelCase(k)))
        }
    }
}

function Atendimento({ attendance }) {
    const liClasses = 'py-1'
    const {pg} = useRouter().query
    return(
            <div className="py-4 px-2 sm:px-4">
                <div className="border-blue-200 border-b-4">
                    <h1 className="text-blue-900 text-2xl"><FontAwesomeIcon icon={faAddressBook} />{' '}Contato</h1>
                </div>
                <ul>
                    <li className={liClasses}><strong>Email: </strong>{attendance.email}</li>
                    <li className={liClasses}><strong>Localização: </strong>{attendance.location}</li>
                    <li className={liClasses}><strong>Horários: </strong>{attendance.schedule}</li>
                    <li className={liClasses}><strong>Telefones: </strong>
                        <ol>
                            {attendance.phones.map(phone => <li>{phone.number} <strong>`(${phone.type === 'fixed' ? 'Fixo' : 'Celular'})`</strong></li>)}
                        </ol>
                    </li>
                </ul>
            </div>
    )
}

function Classes({ classes }) {
    const [maxShow, setMaxShow] = useState(5)
    return(
        <div className="py-4 px-2 max-w-sm sm:px-4">
            <div className="border-blue-200 border-b-4">
                <h1 className="text-blue-900 text-2xl"><FontAwesomeIcon icon={faTable} />{' '}Turmas</h1>
            </div>
            <ol>
                {classes.slice(0, maxShow).map(_class => <li className="py-1">{_class.nomeComponente}<strong>({_class.descricaoHorario})</strong></li>)}
                {maxShow == 5 ? <li><a onClick={() => setMaxShow(classes.length)}>Mostrar mais...</a></li> : <li><a onClick={() => setMaxShow(5)}>Mostrar menos...</a></li> }
            </ol>
        </div>
    )
}

export default function PostGraduation({ pgData, classesData }) {
    return(
        <Layout>
            <div className="flex justify-center flex-wrap bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                <h1 className="lg:mx-36 pb-12 pt-8 text-6xl text-white font-bold">{pgData.name}</h1>
                <h1 className="lg:mx-36 pb-8 pt-4 text-2xl text-white font-bold">{pgData.description_small}</h1>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap p-4 bg-white">
                    <Atendimento attendance={pgData.attendance} />
                    <Classes classes={classesData} />
                </div>
            </div>
        </Layout>
    )
}