import { BookOpenCheck, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="fixed z-50 w-full shadow-sm bg-white/80 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <BookOpenCheck className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Taglibro</span>
            </div>
          </Link>

          <div className="items-center hidden space-x-8 md:flex">
            <a href="#sobre" className="text-gray-600 transition-colors hover:text-indigo-600">
              Sobre
            </a>
            <a href="/#planos" className="text-gray-600 transition-colors hover:text-indigo-600">
              Planos
            </a>
            <Link to="/institutionregister" className="text-gray-600 transition-colors hover:text-indigo-600">
              Registrar instituições
            </Link>
            <Link
              to="/userlogin"
              className="px-6 py-2 text-white transition-colors bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
