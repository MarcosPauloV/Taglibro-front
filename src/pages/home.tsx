import { ArrowRight } from "lucide-react";
import Features from "../components/features";
import ContactForm from "../components/contact-form";

function Home() {
  return (
    <>
      <div className="relative flex items-center min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] opacity-5 -z-10" />
        <div className="px-4 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Diário Digital,
              <span className="block text-blue-600">Acessível e Compartilhado</span>
            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-xl text-gray-600">
              Centralize seus registros de atividades em um único espaço digital seguro. O <strong>Taglibro</strong> foi
              projetado para ser acessível e otimizado, oferecendo suporte a múltiplos usuários e organizações.
            </p>

            <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
              <button className="inline-flex items-center px-8 py-3 text-base font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-full hover:bg-blue-700">
                Experimente Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="inline-flex items-center px-8 py-3 text-base font-medium text-blue-600 transition-colors border border-transparent rounded-full bg-blue-50 hover:bg-blue-100">
                Saiba Mais
              </button>
            </div>

            <div className="mt-12">
              <p className="text-sm text-gray-500">
                Ideal para instituições acadêmicas e organizações que buscam uma solução integrada de registro e gestão.
              </p>
              <div className="flex justify-center mt-4 space-x-8">
                {/* Logos de instituições ou exemplos poderiam ser inseridos aqui */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <ContactForm />
    </>
  );
}

export default Home;
