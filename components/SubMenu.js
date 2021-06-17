import { useState, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SubMenu({title, titleIcon, children}) {
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