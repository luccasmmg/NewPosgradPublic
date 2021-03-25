import Image from 'next/image'

import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import groupBy from 'lodash/groupBy'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare,  faLink } from '@fortawesome/free-solid-svg-icons'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/equipe`)
    const staff = await res.json()
    const groupedStaff = groupBy(staff, (x) => x.rank == 'coordinator' || x.rank == 'vice_coordinator' ? 'coordination' : 'notCoordination')
    return {
        props: {
            staff: groupedStaff
        },
        revalidate: 300,
    }
}

function Card({ person }) {
    const jobs = { 'intern': 'Bolsista', 'coordinator': 'Coordenador', 'vice-coordinator': 'Vice coordenador', 'secretariat': 'Secretariado' }
    return(
        <div className="my-4 mx-2 w-full md:w-9/2 bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
            <h4 id="nome" className="text-xl font-semibold mb-2">{person.name}</h4>
            <h5 id="cargo" className="text-gray-700 font-semibold mb-2">{jobs[person.rank]}</h5>
            <div id="header" className="flex"> 
            <img alt="Foto de perfil" className="w-1/2 rounded-md border-2 border-gray-300" src={person.photo} />
            </div>
            <p id="Descrição" className="text-gray-800 mt-2">{person.description}</p>
        </div>
    )
}

export default function Staff({ staff }) {
    return(
        <BasicPage title="Equipe">
            <div className="w-full flex justify-center items-center py-2">
                <h1 className="py-2 text-blue-900 text-2xl font-normal">Coordenação</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {staff.coordination.map(person => (<Card key={person.id} person={person} />))}
            </div>
            <div className="w-full flex justify-center items-center py-2">
                <h1 className="py-2 text-blue-900 text-2xl font-normal">Secretariado</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {staff.notCoordination.map(person => (<Card key={person.id} person={person} />))}
            </div>
        </BasicPage>
    )
}