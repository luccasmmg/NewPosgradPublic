import TopNav from './TopNav'
import Footer from './Footer'

export default function Layout({ home, children }) {
    return (
        <>
            <header className="bg-blue-800 p-8"><TopNav></TopNav></header>
            <main className="container my-4 bg-white w-full md:max-w-4xl mx-auto pt-20">
                {children}
            </main>
            <footer className="p-8 footer bg-white relative pt-1 border-b-2 border-blue-700"><Footer></Footer></footer>
        </>
    )
}