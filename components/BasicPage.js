import Layout from './Layout'
import Head from 'next/head'

export default function BasicPage({ title, children }) {
    return(
        <Layout>
            <Head><title>{title}</title></Head>
            <main className="container shadow my-8 bg-white w-full md:max-w-4xl mx-auto">
                <div className="w-full px-4 md:px-6 text-base text-gray-800">
                    {title &&
                        <div className="w-full flex justify-center items-center border-b-4 border-red-200">
                            <h1 className="py-2 text-red-900 text-4xl font-normal">{title}</h1>
                        </div>
                    }
                    {children}
                </div>
            </main>
        </Layout>
    )
}
