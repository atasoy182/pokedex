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
import Favorites from "../favorites/Favorites";
import Toggle from "../toggle/Toggler";
import {Link} from "react-router-dom";

const Navi = (props) => {
  return (
    <div>
      <Navbar light expand="md">
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to = {"/"}><h5>Find</h5></Link></NavLink>
            </NavItem>
            <CatchedPokemons/>
            <Favorites/>
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
