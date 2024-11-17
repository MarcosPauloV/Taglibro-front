import { Outlet } from "react-router-dom";
import Nav from "./nav";

function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="pt-16 pb-12">
        <Outlet />
      </main>
      <footer className="flex items-center justify-center px-5 py-5 bg-gray-50">
        © 2024 Taglibro. Todos os direitos reservados.
      </footer>
    </>
  );
}

export default Layout;
