import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import SubMenu from './SubMenu'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase,  faBook, faBookOpen, faFile, faUserGraduate, faChalkboardTeacher, faGraduationCap, faAppleAlt, faTable, faLeaf, faAtlas, faNewspaper, faUsers, faScroll, faFolderOpen, faFolder, faHandshake, faChartLine, faClipboardCheck, faCalendar, faPlane, faSearch, faRandom } from '@fortawesome/free-solid-svg-icons'
import BASE_URL from '../pages/api/config'

function NavLink({href, title, linkIcon}) {
    const {pg} = useRouter().query
    return (
        <Link href={`/${pg}/${href}`}>
            <a className="block px-4 py-2 mt-2 text-sm text-gray-500 font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-black dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                <FontAwesomeIcon icon={linkIcon} />{' '}{title}
            </a>
        </Link>
    )
}

function DividerTitle({ title }) {
    return (
        <span className="block px-4 py-2 mt-2 text-sm text-gray-700 font-bold rounded-lg dark-mode:bg-transparent md:mt-0">
            {title}
        </span>
    )
}

export default function TopNav() {
    const {pg} = useRouter().query
    const [open, setOpen] = useState(false);
    const [pgs, setPgs] = useState([]);

    useEffect(() => {    
        async function getPgs() {
            const res = await fetch(`${BASE_URL}/api/v1/publico/`)
            const pgs = await res.json()
            setPgs(pgs)
        }
        getPgs()
    }, pgs)

    return (
        <div className="p-8">
            <div className="w-full rounded text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto lg:items-center lg:justify-between lg:flex-row lg:px-6 lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                <a href="https://ccsa.ufrn.br" className="hidden md:block pt-1 text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                    <Image src='/ccsa_logo.png' width={40} height={40} />
                </a>
                <a href="https://ufrn.br" className="hidden md:block pt-1 mt-1 mx-2 text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                    <Image src='/ufrn_logo.png' width={70} height={40} />
                </a>
                <Link href={`/${pg}`}>
                    <a className="text-lg px-2 font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">{' '}{pg}</a>
                </Link>
                <button aria-label="abrir-menu" className="lg:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => setOpen(!open)}>
                    <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    {!open && <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>}
                    {open && <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>}
                    </svg>
                </button>
                </div>
                <nav className={`${open ? 'flex' : 'hidden'} flex-col flex-grow pb-4 lg:pb-0 lg:flex lg:justify-end lg:flex-row`}>
                    <SubMenu key={1} title="Acadêmico" titleIcon={faGraduationCap}>
                        <DividerTitle title="Ensino" />
                        <NavLink href='disciplinas' title='Disciplinas' linkIcon={faChalkboardTeacher}/>
                        <NavLink href='discentes' title='Discentes' linkIcon={faUserGraduate}/>
                        <NavLink href='professores' title='Docentes' linkIcon={faAppleAlt}/>
                        <NavLink href='turmas' title='Turmas' linkIcon={faTable}/>
                        <hr></hr>
                        <DividerTitle title="Pesquisa e Extensão" />
                        <NavLink href='projetos' title='Projetos' linkIcon={faSearch}/>
                        <NavLink href='dissertacoes' title='Dissertações' linkIcon={faAtlas}/>
                        <NavLink href='defesas' title='Defesas de Tese' linkIcon={faClipboardCheck}/>
                        <NavLink href='intercambios' title='Intercâmbios' linkIcon={faPlane}/>
                        <hr></hr>
                        <DividerTitle title="Programa" />
                        <NavLink href='impacto' title='Impacto' linkIcon={faChartLine}/>
                    </SubMenu>
                    <SubMenu key={2} title="Publicações" titleIcon={faBriefcase}>
                        <NavLink href='artigos' title='Artigos' linkIcon={faScroll}/>
                        <NavLink href='livros' title='Livros' linkIcon={faBook}/>
                        <NavLink href='capitulos' title='Capitulos' linkIcon={faBookOpen}/>
                        <NavLink href='trabalhos' title='Apresentações Trabalhos' linkIcon={faChalkboardTeacher}/>
                        <NavLink href='repositorio' title={`Repositório ${pg.toUpperCase()}`} linkIcon={faAtlas}/>
                    </SubMenu>
                    <SubMenu key={3} title="Coordenação" titleIcon={faLeaf}>
                        <NavLink href='convenios' title='Convênios' linkIcon={faHandshake}/>
                        <NavLink href='equipe' title='Equipe' linkIcon={faUsers}/>
                        <NavLink href='eventos' title='Eventos' linkIcon={faCalendar}/>
                        <NavLink href='noticias' title='Notícias' linkIcon={faNewspaper}/>
                    </SubMenu>
                    <SubMenu key={4} title="Documentos" titleIcon={faFolderOpen}>
                        <NavLink href='documentos/resolucoes' title='Resoluções' linkIcon={faFolder}/>
                        <NavLink href='documentos/atas' title='ATAs' linkIcon={faFolder}/>
                        <NavLink href='documentos/regimentos' title='Regimentos' linkIcon={faFolder}/>
                        <NavLink href='documentos/planos' title='Planos' linkIcon={faFolder}/>
                        <NavLink href='documentos/outros' title='Outros' linkIcon={faFolder}/>
                    </SubMenu>
                    <SubMenu key={5} title="Pós Graduaçãoes" titleIcon={faRandom}>
                        {pgs.map(pg => 
                            <Link key={pg.id} href={`/${pg.initials}/`}>
                                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-black dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                                    {pg.name}
                                </a>
                            </Link>
                            )}
                    </SubMenu>
                </nav>
            </div>
            </div>
        </div>
    )
} 