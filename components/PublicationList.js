import Layout from './Layout'
import Head from 'next/head'

export default function PublicationList({ title, children }) {
    return(
        <Layout>
            <Head><title>{title}</title></Head>
            <div className="shadow-xl w-full px-4 md:px-6 text-xl text-gray-800">
                <div className="w-full flex justify-center items-center">
                    <h1 className="py-4 text-blue-900 text-4xl font-normal">{title}</h1>
                </div>
                {children}
            </div>
        </Layout>
    )
}