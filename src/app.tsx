import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const RegisterInstitution = lazy(() => import("./pages/register-institution"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "20%" }}>
            <img src="./loading.svg" alt="Loading..." style={{ width: "100px", height: "100px" }} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerInstitution" element={<RegisterInstitution />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
