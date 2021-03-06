import BasicPage from '../../components/BasicPage'

import getPgs from '../../lib/getPgs'

import mapKeys from 'lodash/mapKeys'
import camelCase from 'lodash/camelCase'
import orderBy from 'lodash/orderBy'

export async function getStaticPaths() {
    return getPgs()
}

export async function getStaticProps({ params }) {
    const resPg = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}`)
    const pg = await resPg.json()

    const parsedCoursesWithStudents = await Promise.all(pg.courses.map(async (course) => {
        const res = await fetch(`http://localhost:8000/api/v1/publico/${params.pg}/discentes/${course.id_sigaa}`)
        const students = await res.json()
        const parsedStudents = students.map(student => mapKeys(student, (v, k) => camelCase(k)))
        return { courseName: course.name, students: parsedStudents}
    }))

    const resAdvisors = await fetch (`http://localhost:8000/api/v1/publico/${params.pg}/orientadores`)
    const advisors = await resAdvisors.json()

    const coursesWithStudentsAndStudentsWithAdvisors = parsedCoursesWithStudents.map(studentsList => {
        const studentsWithAdvisors = studentsList.students.map(student => {
            const advisor = advisors.find(advisor => advisor.registration === student.matricula)
            const parsedAdvisor = advisor ? mapKeys(advisor, (v, k) => camelCase(k)) : 'Não informado'
            const studentWithAdvisor = {...student, advisor: parsedAdvisor}
            return studentWithAdvisor
        })
        return {courseName: studentsList.courseName, students: studentsWithAdvisors}
    })
    return {
        props: {
            coursesWithStudents: coursesWithStudentsAndStudentsWithAdvisors
        }
    }
}

function StudentGroup({ students }) {
    const thCSS = 'text-center py-3 px-4 uppercase font-semibold text-sm'
    const tdCSS = 'text-center py-3 px-4 text-sm'
    return(
        <>
            <table className="hidden sm:table w-full my-8">
                <thead className="w-full bg-red-800 text-white">
                    <tr>
                        <th className={thCSS}>Nome</th>
                        <th className={thCSS}>Orientador</th>
                        <th className={thCSS}>Matrícula</th>
                    </tr>
                </thead>
                {students.map(student => {
                    return(
                        <tr key={student.matricula}>
                            <td className={tdCSS}>{student.nomeDiscente}</td>
                            <td className={tdCSS}>{student.advisor.nameAdvisor ? student.advisor.nameAdvisor : student.advisor}</td>
                            <td className={tdCSS}>{student.matricula}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

function StudentsList({ students }) {
    return(
        <div className="sm:hidden flex-wrap justify-between">
            { students.map(student => {
                return(
                    <div key={student.matricula} className="flex-grow px-4 py-6 border-b-4 border-red-400">
                        <h3 className="py-4"><strong>{student.nomeDiscente}</strong></h3>
                        <ul>
                            <li><strong>Matrícula: </strong>{student.matricula}</li>
                            <li><strong>Orientador: </strong>{student.advisor.nameAdvisor ? student.advisor.nameAdvisor : student.advisor}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default function Students({ coursesWithStudents }) {
    return(
        <BasicPage title="Discentes">
                { coursesWithStudents.map(courseWithStudents => {
                    return(<StudentGroup key={courseWithStudents.courseName} students={orderBy(courseWithStudents.students, 'nome')} title={courseWithStudents.courseName}/>)
                })}
                { coursesWithStudents.map(courseWithStudents => {
                    return(<StudentsList key={courseWithStudents.courseName} students={orderBy(courseWithStudents.students, 'nome')} title={courseWithStudents.courseName}/>)
                })}
        </BasicPage>
    )
}
