import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import {
  favorutesUrl,
  heartIcon,
  pokeBall,
  typeUrl,
} from "../common/Common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as inventoryActions from "../../redux/actions/inventoryActions";
import * as favActions from "../../redux/actions/favActions";
import alertify from "alertifyjs";

const PokemonCard = (props) => {
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/" + props.poke.id),
    [history]
  );

  const catchedHandler = (poke) => {
    props.actions.addToInventory({ quantity: 1, pokemon: poke });
    alertify.success(poke.name + " catched");
  };

  const favHandler = (poke) => {
    let showSuccessAlert = true;
    if (props.fav.find((pokemon) => pokemon.id === poke.id)) {
      showSuccessAlert = false;
    }
    props.actions.addOrRemoveFav(poke);
    if (showSuccessAlert) {
      alertify.success(poke.name + " added to favorites");
    } else {
      alertify.error(poke.name + " removed from favorites");
    }
  };

  if (
    (props.filter.currentType.name === "All" ||
      props.poke.types.includes(props.filter.currentType.name.toLowerCase())) &&
    (props.filter.searchText === "" ||
      props.poke.name.toLowerCase().match(props.filter.searchText))
  ) {
    return (
      <div class="text-center">
        <Card className="Regular shadow">
          <div>
            <div>
              {props.fav.find((pokemon) => pokemon.id === props.poke.id) ? (
                <img alt="..." src={favorutesUrl} width={50} />
              ) : null}
            </div>
            <Button
              color=".btn-primary-outline"
              onClick={() => {
                handleOnClick();
              }}
            >
              <img
                width={150}
                height={150}
                src={props.poke.imageUrl}
                alt="..."
                class="rounded mx-auto d-block"
                style={{ "object-fit": "contain" }}
              />
            </Button>
          </div>
          <CardBody>
            <CardTitle>
              <h5>
                {props.poke.name[0].toUpperCase() +
                  props.poke.name.slice(1).toLowerCase()}
              </h5>
            </CardTitle>
            <CardText>
              {props.poke.types.map((type) => {
                return (
                  <img
                    width={40}
                    style={{ margin: 2 }}
                    alt="..."
                    src={typeUrl + type.toLowerCase() + ".png"}
                  />
                );
              })}
            </CardText>
            <Button
              color=".btn-primary-outline"
              onClick={() => {
                catchedHandler(props.poke);
              }}
            >
              <img alt="..." src={pokeBall} width={50} />
            </Button>
            <Button
              color=".btn-primary-outline"
              onClick={() => {
                favHandler(props.poke);
              }}
            >
              <img alt="..." src={heartIcon} width={50} />
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return null;
};

function mapStateToPops(state, ownProps) {
  return {
    fav: state.favReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addToInventory: bindActionCreators(
        inventoryActions.addToInventory,
        dispatch
      ),
      addOrRemoveFav: bindActionCreators(favActions.addOrRemoveFav, dispatch),
    },
  };
}

export default connect(mapStateToPops, mapDispatchToProps)(PokemonCard);
