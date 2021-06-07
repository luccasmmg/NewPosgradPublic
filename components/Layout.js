import TopNav from './TopNav'
import Footer from './Footer'

export default function Layout({ home, children }) {
    return (
        <>
            <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-400"><TopNav></TopNav></header>
            {children}
            <footer className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 border-t-4 border-red-600 footer relative"><Footer></Footer></footer>
        </>
    )
}
