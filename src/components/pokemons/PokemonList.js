import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Badge, Container, Spinner } from "reactstrap";
import { bindActionCreators } from "redux";
import * as pokemonActions from "../../redux/actions/pokemonActions";
import { PaginationElement } from "../pagination/Pagination";
import { PokemonCard } from "../pokemonCard/PokemonCard";

const PokemonList = (props) => {
  const [imageLoading, setImageLoading] = useState(true);
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
      <div className="card-columns">
        {props.pokemons.map((poke) => (
          <PokemonCard poke={poke} />
        ))}
      </div>
    );
  };

  return (
    <Container>
      <h1>
        <Badge color="warning"> POKEMON LIST </Badge>
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
