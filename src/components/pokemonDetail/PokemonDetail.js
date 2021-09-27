import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useEffect } from "react";
import * as pokemonDetailActions from "../../redux/actions/pokemonDetailActions";
import * as favActions from "../../redux/actions/favActions";
import { favorutesUrl, imageNotFound, typeUrl } from "../common/Common";
import alertify from "alertifyjs";

const PokemonDetail = (props) => {
  useEffect(() => {
    props.actions.getPokemon(props.id);
    return () => {
      props.actions.clearPokemon();
    };
  }, []);

  const getFlavorText = () => {
    if (props.pokemon.details) {
      return props.pokemon.details.text;
    }
    return "";
  };

  const getPokemonColor = () => {
    if (props.pokemon.details) {
      return props.pokemon.details.color;
    }
    return "black";
  };

  const favHandler = () => {
    let showSuccessAlert = true;

    if (props.fav.find((pokemon) => pokemon.id === props.pokemon.id)) {
      showSuccessAlert = false;
    }
    props.actions.addOrRemoveFav(props.pokemon);
    if (showSuccessAlert) {
      alertify.success(props.pokemon.name + " added to favorites");
    } else {
      alertify.error(props.pokemon.name + " removed from favorites");
    }
  };

  const getFamily = () => {
    if (props.pokemon.family) {
      return (
        <div class="text-center">
          <p></p>
          <h4>
            <b>FAMILY</b>
          </h4>
          <div class="d-flex justify-content-center">
            {props.pokemon.family.length > 0
              ? props.pokemon.family.map((item) => (
                  <img
                    height="70"
                    src={item.imageUrl}
                    alt="..."
                    class="rounded mx-auto d-block"
                    style={{ "object-fit": "contain" }}
                  />
                ))
              : null}
          </div>
        </div>
      );
    }
    return null;
  };

  const getBody = () => {
    return (
      <div>
        <Row>
          <Col xs="6">
            {
              <div>
                <img
                  width="60%"
                  src={
                    props.pokemon.sprites.other.dream_world.front_default ||
                    props.pokemon.sprites.other["official-artwork"]
                      .front_default ||
                    imageNotFound
                  }
                  alt="..."
                  class="rounded mx-auto d-block"
                  style={{ "object-fit": "contain" }}
                />

                <div class="text-center">
                  <br />
                  <h4>
                    <b>ABILITIES</b>
                  </h4>

                  {props.pokemon.abilities.map((ability) => (
                    <div class="chip">{ability.ability.name}</div>
                  ))}
                </div>

                {getFamily()}
              </div>
            }
          </Col>
          <Col xs="6">
            <h1 className="display-4" style={{ color: getPokemonColor() }}>
              {props.pokemon.name[0].toUpperCase() +
                props.pokemon.name.slice(1).toLowerCase()}

              {props.fav.find((pokemon) => pokemon.id === props.pokemon.id) ? (
                <img
                  onClick={() => {
                    favHandler();
                  }}
                  alt="..."
                  src={favorutesUrl}
                  width={50}
                />
              ) : null}
            </h1>
            <p>
              {props.pokemon.types.map((type) => {
                return (
                  <img
                    width={40}
                    style={{ margin: 2 }}
                    alt="..."
                    src={typeUrl + type.type.name.toLowerCase() + ".png"}
                  />
                );
              })}
              <b> Height: </b> {props.pokemon.height} <b> Weight: </b>{" "}
              {props.pokemon.weight}
            </p>
            {props.pokemon.stats.map((stat) => (
              <div class="stats">
                <b style={{ color: getPokemonColor() }}>{stat.stat.name}</b>
                <div class="statChip"> {stat.base_stat}</div>
              </div>
            ))}
            <p></p>
            <p>{getFlavorText()}</p>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Container>
      {Object.keys(props.pokemon).length ? getBody() : null}
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getPokemon: bindActionCreators(pokemonDetailActions.getPokemon, dispatch),
      clearPokemon: bindActionCreators(
        pokemonDetailActions.clearPokemon,
        dispatch
      ),
      addOrRemoveFav: bindActionCreators(favActions.addOrRemoveFav, dispatch),
    },
  };
}

function mapStateToProps(state, ownProps) {
  let pokemon_id = ownProps.match.params.pokemon_id;
  return {
    pokemon: state.pokemonDetailReducer,
    id: pokemon_id,
    fav: state.favReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
