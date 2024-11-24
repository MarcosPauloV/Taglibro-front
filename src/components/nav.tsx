import { BookOpenCheck, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStorage } from "../hooks/use-storage/use-sorage";

function Nav() {
  const { getItem, removeItem } = useStorage();
  const isLoggedIn = !!getItem("token");
  const role = getItem("type"); // Obtém a role do localStorage
  const institutionId = getItem("institutionId"); // Obtém o institutionId do localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    removeItem("token");
    removeItem("accountId");
    removeItem("type");
    removeItem("institutionId");
    alert("Você saiu com sucesso!");
    navigate("/login"); // Redireciona para a página de login
  };

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
            {!isLoggedIn ? (
              <>
                <Link to="/registerInstitution" className="text-gray-600 transition-colors hover:text-indigo-600">
                  Registrar instituições
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2 text-white transition-colors bg-indigo-600 rounded-full hover:bg-indigo-700"
                >
                  Login
                </Link>
              </>
            ) : role === "USER" ? (
              <>
                <Link to="/branch" className="text-gray-600 transition-colors hover:text-indigo-600">
                  Filiais
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                {role === "ADMIN" || institutionId ? (
                  <>
                    <Link to="/institution" className="text-gray-600 transition-colors hover:text-indigo-600">
                      Instituição
                    </Link>
                    <Link to="/branch" className="text-gray-600 transition-colors hover:text-indigo-600">
                      Filial
                    </Link>
                  </>
                ) : null}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
                >
                  Sair
                </button>
              </>
            )}
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
