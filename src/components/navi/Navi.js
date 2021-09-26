import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import CatchedPokemons from "../catchedPokemons/CatchedPokemons";
import Toggle from "../toggle/Toggler";

const Navi = (props) => {
  return (
    <div>
      <Navbar light expand="md">
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/"><h5>Components</h5></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                <h5>GitHub</h5>
              </NavLink>
            </NavItem>
            <CatchedPokemons/>
          </Nav>
          <NavbarText>
            <Toggle theme={props.themeMode} toggleTheme={props.toggleTheme} />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navi;
