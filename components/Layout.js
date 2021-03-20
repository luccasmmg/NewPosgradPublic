import TopNav from './TopNav'

export default function Layout({ children }) {
    return (
        <>
            <header className="bg-blue-800 p-8"><TopNav></TopNav></header>
            <main className="container bg-white w-full md:max-w-3xl mx-auto pt-20">
                {children}
            </main>
            <footer className="p-8"></footer>
        </>
    )
}