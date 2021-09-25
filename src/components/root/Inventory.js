import React, { Component } from "react";
import PokemonList from "../pokemons/PokemonList";
import TypesList from "../types/TypesList";
import { Row, Col } from "reactstrap";

export default class Inventory extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="3">
            <TypesList></TypesList>
          </Col>
          <Col xs="9">
            <PokemonList></PokemonList>
          </Col>
        </Row>
      </div>
    );
  }
}
