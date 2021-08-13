import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/eventos`)
    const events = await res.json()
    return {
        props: {
            events
        }
    }
}

export default function Events({ events }) {
    return(
        <BasicPage title="EVENTOS">
            <div className="flex flex-wrap justify-between">
                {events.map(event => {
                    const initialDate = new Date(event.initial_date);
                    const finalDate = new Date(event.final_date);
                    return(
                        <div key={event.id} className="my-2 bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-2 text-red-700">{event.title}</h2>
                            <p className="text-gray-700">Inicio: {initialDate.getDay()}/{initialDate.getMonth()}/{initialDate.getFullYear()}</p>
                            <p className="text-gray-700">Final: {finalDate.getDay()}/{finalDate.getMonth()}/{finalDate.getFullYear()}</p>
                            <p className="text-gray-700">Mais informações: <a href={event.link}>{event.link}</a></p>
                        </div>)
                })}
            </div>
        </BasicPage>
    )
}