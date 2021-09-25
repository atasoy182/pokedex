import React from "react";
import { connect } from "react-redux";
import { Badge, Container } from "reactstrap";

const PokemonList = (props) => {
  return (
    <Container>
      <h1>
        <Badge color="warning">POKEMON LIST</Badge>
        <Badge color="success">{props.currentType.name}</Badge>
      </h1>
    </Container>
  );
};

function mapStateToPops(state) {
  return {
    currentType: state.changeTypeReducer,
  };
}

export default connect(mapStateToPops)(PokemonList);
