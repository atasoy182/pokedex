import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Badge, Container, Spinner } from "reactstrap";
import { bindActionCreators } from "redux";
import * as pokemonActions from "../../redux/actions/pokemonActions";
import * as inventoryActions from "../../redux/actions/inventoryActions";
import { PaginationElement } from "../pagination/Pagination";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { SearchBar } from "../search/SearchBar";
import alertify from "alertifyjs"

const PokemonList = (props) => {
  const [searchText, setSearchText] = useState("");
  const pokemonsPerPage = 50;

  useEffect(() => {
    props.actions.getPokemons(0, pokemonsPerPage);
  }, []);

  const handlePageChanged = (selectedPage) => {
    props.actions.getPokemons(selectedPage * pokemonsPerPage, pokemonsPerPage);
  };

  const getSpinner = () => {
    return <Spinner color="primary" />;
  };

  const cachedHandler = (pokemon) => {
    console.log(pokemon)
    props.actions.addToInventory({quantity : 1, pokemon : pokemon});
    alertify.success(pokemon.name + " catched")
  };

  const getBody = () => {
    return (
      <div className="card-columns">
        {props.pokemons.map((poke, index) => (
          <PokemonCard
            key={index}
            poke={poke}
            filter={{ currentType: props.currentType, searchText: searchText }}
            cached={() => cachedHandler(poke)}
          />
        ))}
      </div>
    );
  };

  const handleOnChangeText = (value) => {
    setSearchText(value);
  };

  return (
    <Container>
      <h1>
        <Badge color="warning"> POKEMON LIST </Badge>
        <Badge color="success">{props.currentType.name}</Badge>
      </h1>

      <SearchBar onChange={(value) => handleOnChangeText(value)} />

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
      addToInventory: bindActionCreators(
        inventoryActions.addToInventory,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToPops, mapDispatchToProps)(PokemonList);
