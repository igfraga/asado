import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Builder } from "./builder-form";
import * as Rt from "react-router-dom";
import * as Ch from "@chakra-ui/react";

function Tafies() {

  return (
    <Ch.Link as={Rt.Link} to="/asado">Asado</Ch.Link>
  )
}

function Routes() {
  return (
    <Rt.Routes>
      <Rt.Route path="/" element={<Tafies/>}></Rt.Route>
      <Rt.Route path="/asado" element={<Builder />}></Rt.Route>
    </Rt.Routes>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Rt.BrowserRouter>
        <Routes />
      </Rt.BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
