import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Badge, Container, Table, Spinner, Col } from "reactstrap";
import { bindActionCreators } from "redux";
import * as pokemonActions from "../../redux/actions/pokemonActions";
import { PaginationElement } from "../pagination/Pagination";

const PokemonList = (props) => {
  const pokemonsPerPage = 15;

  useEffect(() => {
    props.actions.getPokemons(0, pokemonsPerPage);
  }, []);

  const handlePageChanged = (selectedPage) => {
    props.actions.getPokemons(selectedPage * pokemonsPerPage, pokemonsPerPage);
  };

  const getSpinner = () => {
    return <Spinner color="primary" />;
  };

  const getBody = () => {
    return (
      <Col>
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
                  <img width={50} src={poke.imageUrl} alt="new" />
                </th>
                <th>{poke.name}</th>
                <th>{poke.types.toString()}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  };

  return (
    <Container>
      <h1>
        <Badge color="warning">POKEMON LIST</Badge>
        <Badge color="success">{props.currentType.name}</Badge>
      </h1>

      {props.isLoading ? getSpinner() : getBody()}

      <PaginationElement
        pageCount={props.count / pokemonsPerPage}
        onPageChange={(data) => handlePageChanged(data.selected)}
      ></PaginationElement>
    </Container>
  );
};

function mapStateToPops(state) {
  return {
    currentType: state.changeTypeReducer,
    pokemons: state.pokemonListReducer.allPokemons,
    isLoading: state.pokemonListReducer.isLoading,
    count: state.pokemonListReducer.count,
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
