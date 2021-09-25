import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Find from "./Find";
import Inventory from "./Inventory";

function App() {
  return (
    <Container>
      <Navi/>
      <Inventory/>
    </Container>
  );
}

export default App;
