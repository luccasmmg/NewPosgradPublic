export default function Footer() {
    const linkCSS = "text-white text-md hover:text-bold"
    const titleColCSS = "font-bold text-white uppercase mb-2"
    return(
        <>
            <div className="container mx-auto pb-4 px-6">
                <div className="sm:flex pb-6 sm:mt-8">
                    <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-around">
                        <div className="flex flex-col">
                            <span className="my-1"><a href="http://ufrn.br/" className={linkCSS} >UFRN: Universidade Federal do Rio Grande do Norte</a></span>
                            <span className="my-1"><a href="https://sigaa.ufrn.br/sigaa/public/home.jsf" className={linkCSS} >SIGAA: Sistema Integrado de Gestão de Atividades Acadêmicas</a></span>
                            <span className="my-1"><a href="https://ccsa.ufrn.br/portal/" className={linkCSS} >CCSA: Centro de Ciências Sociais Aplicadas</a></span>
                        </div>
                        <div className="flex flex-col">
                            <span className="my-1"><a href="http://www.capes.gov.br/" className={linkCSS} >CAPES: Coordenação de Aperfeiçoamento de Pessoal de Nível Superior</a></span>
                            <span className="my-1"><a href="http://cnpq.br/" className={linkCSS} >CNPq: Conselho Nacional de Desenvolvimento Científico e Tecnológico</a></span>
                            <span className="my-1"><a href="https://repositorio.ufrn.br/jspui/" className={linkCSS} >RI: Repositório Institucional</a></span>
                        </div>
                    </div>
                </div>
                <span className="sm:px-8 text-white">© 2021 - Projeto Plataforma de Pós-Graduação(v2.0.0) (Centro de Ciências Sociais Aplicadas, Universidade Federal do Rio Grande do Norte)</span>
            </div>
        </>
    )
}