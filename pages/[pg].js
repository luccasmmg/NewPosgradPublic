import { faAddressBook, faCalendar, faClipboardCheck, faFileAlt, faHandshake, faHome, faNewspaper, faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../components/Layout'
import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import { useState } from 'react'
import fetchRetry from '../lib/fetchRetry'
import Image from 'next/image'
import Link from 'next/link'

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

    const resExaminingBoards = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/bancas_sigaa/`, 5)
    const examiningBoards = await resExaminingBoards.json()
    const parsedExaminingBoards = examiningBoards.map(examiningBoard => mapKeys(examiningBoard, (v, k) => camelCase(k))).filter(examiningBoard => examiningBoard.titulo)

    const resClasses = await fetchRetry(`http://localhost:8000/api/v1/publico/${params.pg}/turmas`, 10)
    const classesData = await resClasses.json()

    const resCovenants = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/convenios`)
    const covenants = await resCovenants.json()

    const resNews = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/lista_noticias_sigaa?limit=5`)
    const news = await resNews.json()

    const resEvents = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/eventos`)
    const events = await resEvents.json()

    return {
        props: {
            pgData,
            classesData: classesData.map(classData => mapKeys(classData, (v, k) => camelCase(k))),
            covenants: covenants.filter(covenant => covenant.finished === false),
            newsList: news,
            events,
            examiningBoards: parsedExaminingBoards
        }
    }
}

function Atendimento({ attendance, pg }) {
    const liClasses = 'py-1'
    return(
            <div className="py-4 w-full sm:px-4">
                <div className="border-red-200 w-full border-b-4">
                    <h1 className="text-red-900 text-2xl"><FontAwesomeIcon icon={faAddressBook} />{' '}Contato</h1>
                </div>
                <div className="w-full flex justify-center">
                    <Image src={`/logo_${pg.toLowerCase()}.png`} width={300} height={300} />
                </div>
                <ul>
                    <li className={liClasses}><strong>Email: </strong>{attendance.email}</li>
                    <li className={liClasses}><strong>Localização: </strong>{attendance.location}</li>
                    <li className={liClasses}><strong>Horários: </strong>{attendance.schedule}</li>
                    <li className={liClasses}>
                        <ol>
                            {attendance.phones.map(phone => <li key={phone.number}><strong>Telefone: </strong>{phone.number}({phone.type === 'fixed' ? 'Fixo' : 'Celular'})</li>)}
                        </ol>
                    </li>
                    <iframe className="w-full h-96" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1403.2976292049614!2d-35.19903981944597!3d-5.837988314568564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff86c49f50e1%3A0xc8ff610d7906202f!2sCCSA%20-%20Centro%20de%20Ci%C3%AAncias%20Sociais%20Aplicadas!5e0!3m2!1spt-BR!2sbr!4v1623183899283!5m2!1spt-BR!2sbr"></iframe>
                </ul>
            </div>
    )
}

function Classes({ classes }) {
    const [maxShow, setMaxShow] = useState(5)
    return(
        <div className="py-4 max-w-sm sm:px-4">
            <div className="border-red-200 w-full border-b-4">
                <h1 className="text-red-900 text-2xl"><FontAwesomeIcon icon={faTable} />{' '}Turmas</h1>
            </div>
            <ol>
                {classes.slice(0, maxShow).map(_class => <li key={_class.idTurma} className="py-1">{_class.nomeComponente}<strong>{' '}({_class.descricaoHorario})</strong></li>)}
                {maxShow == 5 ? <li><a onClick={() => setMaxShow(classes.length)}>Mostrar mais...</a></li> : <li><a onClick={() => setMaxShow(5)}>Mostrar menos...</a></li> }
            </ol>
        </div>
    )
}

function News({ newsList, pg }) {
    return(
        <div className="py-4 max-w-sm sm:px-4">
            <div className="border-red-200 w-full border-b-4">
                <h1 className="text-red-900 text-2xl"><FontAwesomeIcon icon={faNewspaper} />{' '}Noticias</h1>
            </div>
            <ol>
                {newsList.map(news => <li key={news.index} className="py-1"><Link href={`/${pg}/noticias/${news.index}`}>{news.title}</Link><strong>({news.date})</strong></li>)}
            </ol>
            <Link href={`/${pg}/noticias`}><a className="text-red-400">Clique aqui para ver o resto das notícias</a></Link>
        </div>
    )
}

function Event({ event }) {
    const initialDate = new Date(event.initial_date);
    const finalDate = new Date(event.final_date);
    return (
        <tr key={event.id} className="schedule-container">
            <td className="schedule-container-date">
                <ul>
                    <li className="schedule-date-day">{initialDate.getDay()}</li>
                    <li className="schedule-date-month">{initialDate.toLocaleString('default', { month: 'long'})}</li>
                    <li className="schedule-date-year">{initialDate.getFullYear()}</li>
                </ul>
            </td>
            <td className="schedule-container-info">
                <h4 className="text-red-900">{ event.title }</h4>
                <p>
                    <a href={ event.link }>Mais informações</a>
                </p>
            </td>
        </tr>
    )
}

function ExaminingBoards({ examiningBoards }) {
    return (
        <div className="py-4 max-w-sm sm:px-4">
            <div className="border-red-200 w-full my-2 border-b-4">
                <h1 className="text-red-900 text-2xl"><FontAwesomeIcon icon={faClipboardCheck} />{' '}Defesas de Tese</h1>
            </div>
        <table className="schedule-table">
        {examiningBoards.map(examiningBoard => {
            const date = new Date(examiningBoard.dataDefesa);
            return(
                <tr key={examiningBoard.idBancaPosGraduacao} className="schedule-container">
                    <td className="schedule-container-date">
                        <ul>
                            <li className="schedule-date-day">{date.getDay()}</li>
                            <li className="schedule-date-month">{date.toLocaleString('default', { month: 'long'})}</li>
                            <li className="schedule-date-year">{date.getFullYear()}</li>
                        </ul>
                    </td>
                    <td className="schedule-container-info">
                        <h6 className="text-sm text-red-900">{ examiningBoard.titulo }</h6>
                        <p className="text-sm">
                            {examiningBoard.nomeDiscente}
                        </p>
                    </td>
                </tr>
            )
        })}
        </table>
        </div>
    )
}

function Events({ events }) {
    const eventsFiltered = events.filter(event => !event.title.toLowerCase().includes("selection"))
    return(
        <div className="py-4 max-w-sm sm:px-4">
            <div className="border-red-200 w-full border-b-4">
                <h1 className="text-red-900 text-2xl"><FontAwesomeIcon icon={faCalendar} />{' '}Eventos</h1>
            </div>
            <p>Eventos anunciados pelo programa</p>
            <table className="schedule-table">
            {eventsFiltered.map(event => <Event event={event} />)}
            </table>
        </div>
    )
}

function Selections({ events }) {
    const selections = events.filter(event => event.title.toLowerCase().includes("selection"))
    return(
        <div className="py-4 max-w-sm sm:px-4">
            <div className="border-red-200 w-full border-b-4">
                <h1 className="text-red-900 text-2xl"><FontAwesomeIcon icon={faFileAlt} />{' '}Seleções</h1>
            </div>
            <table className="schedule-table">
            { selections.length > 0 ? selections.map(selection => <Event event={selection} />) : <p>(Sem eventos agendados no momento.)</p>}
            </table>
        </div>
    )
}

function About({ about }) {
    return(
        <>
            <hr></hr>
            <div className="flex w-full justify-center py-4">
                <h2 className="text-3xl text-red-800 border-b-4"><FontAwesomeIcon icon={faHome} />{' '}Sobre o Programa</h2>
            </div>
            <div className="py-6" dangerouslySetInnerHTML={{ __html: about }} />
        </>
    )
}

export default function PostGraduation({ pgData, classesData, newsList, covenants, events, examiningBoards }) {
    return(
        <Layout>
            <div className="flex justify-center flex-wrap bg-gradient-to-r from-red-600 via-red-500 to-red-400 w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
                <h1 className="lg:mx-36 pb-12 pt-8 text-6xl text-white font-bold">{pgData.name}</h1>
                <h1 className="lg:mx-36 pb-8 pt-4 text-2xl text-white font-bold">{pgData.description_small}</h1>
            </div>
            <div className="flex justify-center">
                <div className="flex my-4 justify-center flex-col bg-white max-w-screen-xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 p-4 bg-white">
                        <Atendimento attendance={pgData.attendance} pg={pgData.initials} />
                        <div>
                            <Selections events={events} />
                            <Events events={events} />
                            <News newsList={newsList} pg={pgData.initials} />
                        </div>
                        <div>
                            <ExaminingBoards examiningBoards={examiningBoards} />
                            <Classes classes={classesData} />
                        </div>
                    </div>
                    {pgData.attendance.about &&
                        <div className="px-8">
                            <About className="w-full" about={pgData.attendance.about} />
                        </div>
                    }
                </div>
            </div>
            <div className="flex py-2 w-full justify-center">
                <div className="flex w-full flex-wrap justify-center space-around bg-white">
                    <div className="flex w-full justify-center pt-6">
                        <h2 className="text-3xl text-red-800 border-b-4"><FontAwesomeIcon icon={faHandshake} />{' '}Convênios</h2>
                    </div>
                    <div className="flex w-4/5 py-4 justify-center flex-wrap content-between bg-white">
                        {covenants.map(covenant => <Image width={200} height={200} alt={covenant.name} src={covenant.logo_file} />)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
