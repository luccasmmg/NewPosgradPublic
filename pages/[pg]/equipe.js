import Image from 'next/image'

import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import groupBy from 'lodash/groupBy'

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
    const checkCoordinator = (person) => person.rank.includes('coordinator')
    return(
        <div className={`my-4 w-full ${!checkCoordinator(person) ? 'md:w-9/2 mx-2' : ''} flex flex-col justify-center bg-white rounded-md tracking-wide`}>
            <div className="flex justify-center">
                {checkCoordinator(person)
                    ?<h3 id="nome" className="text-2xl font-semibold mb-2">{person.name}</h3> 
                    :<h4 id="nome" className="text-xl font-semibold mb-2">{person.name}</h4>
                }
            </div>
            <div className="flex justify-center">
                <h5 id="cargo" className="text-gray-700 font-semibold mb-2">{jobs[person.rank]}</h5>
            </div>
            <div id="header" className="flex flex-wrap flex-col align-center"> 
            <div className={`${checkCoordinator(person) ? 'rounded-full' : ''} flex justify-center`}>
                <img alt="Foto de perfil" className={`${!checkCoordinator(person) ? 'w-24 h-24 rounded-full' : 'w-64 h-64 rounded-full'}`} src={person.photo} />
            </div>
            <p id="Descrição" className="mx-1 text-gray-800 mt-2">{person.description}</p>
            </div>
        </div>
    )
}

export default function Staff({ staff }) {
    return(
        <BasicPage title="Equipe">
            <div className="w-full flex justify-center items-center py-2">
                <h1 className="py-2 text-red-900 text-2xl font-normal">Coordenação</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {staff.coordination.map(person => (<Card key={person.id} person={person} />))}
            </div>
            <div className="w-full flex justify-center items-center py-2">
                <h1 className="py-2 text-red-900 text-2xl font-normal">Secretariado</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {staff.notCoordination.map(person => (<Card key={person.id} person={person} />))}
            </div>
        </BasicPage>
    )
}
