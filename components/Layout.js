export default function Layout({ children }) {
    return (
        <>
            <header className="p-8"></header>
            <main className="container w-full md:max-w-3xl mx-auto pt-20">
                {children}
            </main>
            <footer className="p-8"></footer>
        </>
    )
}