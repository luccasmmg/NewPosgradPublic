import TopNav from './TopNav'
import Footer from './Footer'

export default function Layout({ home, children }) {
    return (
        <>
            <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"><TopNav></TopNav></header>
            {children}
            <footer className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 border-t-4 border-blue-600 footer relative"><Footer></Footer></footer>
        </>
    )
}