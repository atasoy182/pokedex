import React, { useState } from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Inventory from "./Inventory";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../globalStyles";
import { lightTheme, darkTheme } from "./Themes";
import  {useDarkMode} from "../useDarkMode/UseDarkMode"
import Toggle from "../toggle/Toggler";

const App = () => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      
      <Container>
        <Navi themeMode={themeMode} toggleTheme = {themeToggler}/>
        <Inventory />
      </Container>
    </ThemeProvider>
  );
};

export default App;
