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

function StudentGroup({ students, title }) {
    const thCSS = 'text-center py-3 px-4 uppercase font-semibold text-sm'
    const tdCSS = 'text-center py-3 px-4 text-sm'
    return(
        <>
            <table className="w-full my-8">
                <thead className="w-full bg-blue-800 text-white">
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

export default function Students({ coursesWithStudents }) {
    return(
        <BasicPage title="DISCENTES">
                { coursesWithStudents.map(courseWithStudents => {
                    return(<StudentGroup key={courseWithStudents.courseName} students={orderBy(courseWithStudents.students, 'nome')} title={courseWithStudents.courseName}/>)
                })}
        </BasicPage>
    )
}