import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export default function DocumentsTable({ documents, firstTH, secondTH }) {
    const thCSS = 'text-center py-3 px-2 uppercase text-sm'
    const tdCSS = 'text-center py-3 px-1 text-sm'
    return(
        <>
            <table className="w-full my-8">
                <thead className="w-full bg-red-800 text-white">
                    <tr>
                        <th className={thCSS}>{firstTH}</th>
                        <th className={thCSS}>{secondTH}</th>
                        <th className={thCSS}>Baixar</th>
                    </tr>
                </thead>
                {documents.map(document => {
                    return(
                        <tr key={document.id}>
                            <td className={tdCSS}>{document.cod}</td>
                            <td className={tdCSS}>{document.title}</td>
                            <td className={tdCSS}><a href={document.file}><FontAwesomeIcon icon={faDownload} /></a></td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}
