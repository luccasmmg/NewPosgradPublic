import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import groupBy from 'lodash/groupBy'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/convenios`)
    const covenants = await res.json()
    const groupedCovenants = groupBy(covenants, (x) => x.finished ? 'finished' : 'unfinished')
    console.log(groupedCovenants)
    return {
        props: {
            covenants: groupedCovenants
        }
    }
}

function ListOfCovenants({ covenants, title }) {
    return(
        <div>
            <div className="flex justify-center pt-4">
                <h2 className="text-2xl text-blue-600">{title}</h2>
            </div>
            {covenants.map(covenant => {
                return(
                    <div key={covenant.id} className="px-4 py-2 border-b-4 border-blue-400">
                        <h3 className="py-2"><strong>Instituição: </strong>{covenant.initials} - {covenant.name}</h3>
                        <h4><strong>Objeto: </strong></h4>
                        <p>O presente Termo de Compromisso tem por objeto a parceria entre o Departamento de Desenvolvimento de Recursos Humanos da Pró-Reitoria de Gestão de Pessoas (DDRH/PROGESP) da Universidade Federal do Rio Grande do Norte e o Programa de Pós-Graduação em Gestão Pública (PPGP/UFRN) objetivando a qualificação de até 10 servidores da UFRN, selecionados por meio de Processo Seletivo conduzido pelo PPGP/UFRN, para a realização do Curso de Mestrado Profissional em Gestão Pública, com início em 2014.</p>
                    </div>
                )
            })}
        </div>
    )
}

export default function Covenants({ covenants }) {
    return(
        <BasicPage title="CONVÊNIOS">
            <ListOfCovenants covenants={covenants.finished} title="Finalizados" />
        </BasicPage>
    )
}