import { Link } from "react-router-dom";
import "../css/error.css";
import backImage from "../img/formulaE-car.jpg"

const Error = () => {
    return (
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <img src={backImage} className="bg-img"/>
                <div className="text-center">
                    <p className="font-bold">404</p>
                    <h1 className="mt-4 font-bold tracking-tight text-emerald-200 sm:text-5xl">Página não encontrada</h1>
                    <p className="mt-6 text-base font-bold leading-7 text-emerald-300">Desculpa, não conseguimos achar a página que você está procurando.</p>
                    <Link className="mt-10 flex items-center justify-center gap-x-6" to={"/"}>
                            <a className="rounded-md bg-teal-700 px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voltar ao início</a>
                    </Link>
                </div>
            </main>
    )
}

export default Error;