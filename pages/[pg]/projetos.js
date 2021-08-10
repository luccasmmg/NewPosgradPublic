import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import groupBy from 'lodash/groupBy'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/projetos`)
    const projects = await res.json()
    const groupedProjects = groupBy(projects, (x) => x.coordinator_data.name)
    return {
        props: {
            projects: groupedProjects
        }
    }
}

function ListOfProjects({ projects, title }) {
    return(
        <div>
            <div className="flex pt-4">
                <h2 className="text-2xl text-red-600">{title}</h2>
            </div>
            {projects.map(project => {
                return(
                    <div key={project.id} className="px-4 py-2 border-b-4 border-red-400">
                        <h3 className="py-2">{project.name}</h3>
                        <h4><strong>Email: </strong>{project.email}</h4>
                        <h4><strong>Situação: </strong>{project.status}</h4>
                        <h4><strong>Membros: </strong></h4>
                        <ul className="list-disc list-inside">
                            {project.members.map(member => <li className="mx-4">{member.name} ({member.job_title})</li>)}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default function Projects({ projects }) {
    const keys = Object.keys(projects)
    return(
        <BasicPage title="Projetos">
            {keys.map(key => <ListOfProjects projects={projects[key]} title={key} />)}
        </BasicPage>
    )
}
