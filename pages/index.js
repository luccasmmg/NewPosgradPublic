import Head from 'next/head'
import Footer from '../components/Footer'
import TopNavHome from '../components/TopNavHome'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <Head>
        <title>Pós Graduações</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-400"><TopNavHome></TopNavHome></header>
      <main className="flex flex-col items-center justify-center flex-1 px-20 py-4 bg-white text-center">
        <h1 className="text-6xl font-bold">
          Bem vindo ao portal das pós graduações do{' '}
          <a className="text-red-600" href="https://ccsa.ufrn.br">
            CCSA!
          </a>
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/ppga/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-800 focus:text-blue-800"
          >
            <h3 className="text-2xl font-bold text-blue-700">PPGA &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Administração
            </p>
          </a>
          </Link>
          <Link href="/ppgcc/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-purple-800 focus:text-purple-800"
          >
            <h3 className="text-2xl font-bold text-purple-600">PPGCC &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Ciências Contábeis
            </p>
          </a>
          </Link>
          <Link href="/ppgd/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-red-800 focus:text-red-800"
          >
            <h3 className="text-2xl font-bold text-red-600">PPGD &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Direito
            </p>
          </a>
          </Link>
          <Link href="/ppgeco/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-900 focus:text-blue-900"
          >
            <h3 className="text-2xl font-bold text-blue-800">PPGECO &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Economia
            </p>
          </a>
          </Link>
          <Link href="/ppgic/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-purple-900 focus:text-purple-900"
          >
            <h3 className="text-2xl font-bold text-purple-800">PPGIC &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação Gestão da Informação e do Conhecimento
            </p>
          </a>
          </Link>
          <Link href="/ppgp/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-800 focus:text-blue-800"
          >
            <h3 className="text-2xl font-bold text-blue-600">PPGP &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Gestão Pública
            </p>
          </a>
          </Link>
          <Link href="/ppgss/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-green-800 focus:text-green-800"
          >
            <h3 className="text-2xl font-bold text-green-600">PPGSS &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Serviço Social
            </p>
          </a>
          </Link>
          <Link href="/ppgtur/">
          <a
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-700 focus:text-blue-700"
          >
            <h3 className="text-2xl font-bold text-blue-400">PPGTUR &rarr;</h3>
            <p className="mt-4 text-xl">
              Pós Graduação em Turismo
            </p>
          </a>
          </Link>
        </div>
      </main>

    <footer className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 border-t-4 border-red-600 footer relative"><Footer></Footer></footer>
    </>
  )
}
