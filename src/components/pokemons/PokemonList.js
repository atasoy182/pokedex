import React, { useEffect, Image } from "react";
import { connect } from "react-redux";
import { Badge, Container, Table, Spinner } from "reactstrap";
import { bindActionCreators } from "redux";
import * as pokemonActions from "../../redux/actions/pokemonActions";

const PokemonList = (props) => {
  useEffect(() => {
    props.actions.getPokemons();
  }, []);

  const getSpinner = () => {
    return <Spinner color="primary" />;
  };

  const getBody = () => {
    console.log("props");
    console.log(props);
    return (
      <Table striped>
        <thead>
          <tr>
            <th>NAME</th>
            <th>TYPES</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          {props.pokemons.map((poke) => (
            <tr key={poke.id}>
              <th>
                <img
                  width = {50}
                  src={poke.imageUrl}
                  alt="new"
                />
              </th>
              <th>{poke.name}</th>
              <th>{poke.types.toString()}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <h1>
        <Badge color="warning">POKEMON LIST</Badge>
        <Badge color="success">{props.currentType.name}</Badge>
      </h1>

      {props.isLoading ? getSpinner() : getBody()}
    </Container>
  );
};

function mapStateToPops(state) {
  return {
    currentType: state.changeTypeReducer,
    pokemons: state.pokemonListReducer.allPokemons,
    isLoading: state.pokemonListReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPokemons: bindActionCreators(pokemonActions.getPokemons, dispatch),
    },
  };
}

export default connect(mapStateToPops, mapDispatchToProps)(PokemonList);
