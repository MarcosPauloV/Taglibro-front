import { ArrowLeft, BookX } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg text-center">
        <div className="relative">
          <div className="absolute rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 blur"></div>
          <div className="relative p-8 bg-white rounded-lg shadow-xl">
            <BookX className="w-20 h-20 mx-auto mb-6 text-blue-600" />

            <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Página Não Encontrada</h2>

            <p className="mb-8 text-gray-600">
              Parece que você acessou um capítulo perdido do seu diário. Não se preocupe, vamos te ajudar a voltar ao
              caminho certo!
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-full hover:bg-blue-700"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </button>

              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-blue-600 transition-colors border border-transparent rounded-full bg-blue-50 hover:bg-blue-100"
              >
                Página Inicial
              </Link>
            </div>

            <div className="pt-6 mt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Precisa de ajuda? Fale com nossa{" "}
                <Link to="/support" className="text-blue-600 hover:text-blue-700">
                  equipe de suporte
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
