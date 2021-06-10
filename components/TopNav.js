import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase,  faBook, faBookOpen, faFile, faUserGraduate, faChalkboardTeacher, faGraduationCap, faAppleAlt, faTable, faLeaf, faAtlas, faNewspaper, faUsers, faScroll, faFolderOpen, faFolder, faHandshake, faChartLine, faClipboardCheck, faCalendar, faPlane, faSearch } from '@fortawesome/free-solid-svg-icons'

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

function SubMenu({title, titleIcon, children}) {
    const node = useRef()

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [])

    return (
        <div ref={node} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex text-gray-800 flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
            <span><FontAwesomeIcon icon={titleIcon} />{' '}{title}</span>
            <svg fill="currentColor" viewBox="0 0 20 20" className={`${isOpen ? 'rotate-180' : 'rotate-0'} inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg lg:w-48 z-40">
                    <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                        {children}
                    </div>
                </div>
            </Transition>
        </div>    
    )

}

export default function TopNav() {
    const {pg} = useRouter().query
    const [open, setOpen] = useState(false);
    return (
        <div className="p-8">
            <div className="w-full rounded text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto lg:items-center lg:justify-between lg:flex-row lg:px-6 lg:px-8">
                <div className="p-4 flex flex-row items-center justify-between">
                <Link href={`/${pg}`}>
                    <a className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">{pg}</a>
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
                </nav>
            </div>
            </div>
        </div>
    )
} 