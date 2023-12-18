import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Formulario from "./Formulario";
import Login from "./Login";
import Principal from "./Principal";

const Home = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/"> Pagina Inicial </Link>
          </li>
          <li>
            <Link to="/cadastro"> Cadastro </Link>
          </li>

          <li>
            <Link to="login"> Login </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/cadastro" element={<Formulario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Principal/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default Home;
