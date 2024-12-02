import React from "react";
import ClassificacaoIdades from "./ClassificacaoIdades";
import RegistroDeGastos from "./RegistroDeGastos";
import Grafico from "./Grafico";
import Arvore from "./Arvore";

function App() {
  return (
    <div style={{ display: 'flex', gap: '70px'}}>
      <row>
      <Grafico/>
      <br/>
      <Arvore/>
      </row>
      <row>
      <ClassificacaoIdades />
      </row>
      <row>
        <RegistroDeGastos/>
      </row>
    </div>
  );
}

export default App;
