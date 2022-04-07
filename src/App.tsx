import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Builder } from "./builder-form";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Builder />
      </div>
    </ChakraProvider>
  );
}

export default App;
