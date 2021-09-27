import React, { useState } from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Inventory from "./Inventory";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../globalStyles";
import { lightTheme, darkTheme } from "./Themes";
import { useDarkMode } from "../useDarkMode/UseDarkMode";
import Toggle from "../toggle/Toggler";
import { Switch, Route } from "react-router-dom";
import InventoryDetail from "../invontoryDetail/InventoryDetail";
import PokemonDetail from "../pokemonDetail/PokemonDetail";

const App = () => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
        <Container>
          <Navi themeMode={themeMode} toggleTheme={themeToggler} />
          <Switch>
            <Route path="/" exact component = {Inventory} />
            <Route path="/inventory" exact component = {InventoryDetail} />
            <Route path="/:pokemon_id" exact component = {PokemonDetail} />
          </Switch>
        </Container>
    </ThemeProvider>
  );
};

export default App;
