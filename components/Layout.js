import TopNav from './TopNav'
import Footer from './Footer'

export default function Layout({ home, children }) {
    return (
        <>
            <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"><TopNav></TopNav></header>
            {children}
            <footer className="p-8 footer bg-white relative pt-1 border-b-2 border-blue-700"><Footer></Footer></footer>
        </>
    )
}