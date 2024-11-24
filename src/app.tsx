import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const RegisterInstitution = lazy(() => import("./pages/register-institution"));
const NotFound = lazy(() => import("./pages/not-found"));
const Branch = lazy(() => import("./pages/branch"));
const Institution = lazy(() => import("./pages/institution"));
const Branchs = lazy(() => import("./pages/branchs"));
const Course = lazy(() => import("./pages/course"));
const Assesment = lazy(() => import("./pages/assesment"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <img src="./loading.svg" alt="Loading..." className="w-24 h-24" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerInstitution" element={<RegisterInstitution />} />
            <Route path="/institution" element={<Institution />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/branchs" element={<Branchs />} />
            <Route path="/course" element={<Course />} />
            <Route path="/assesment" element={<Assesment />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
