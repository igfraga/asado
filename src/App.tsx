import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BuilderForm } from "./builder-form";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BuilderForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
