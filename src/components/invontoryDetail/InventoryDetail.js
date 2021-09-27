import { Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as inventoryActions from "../../redux/actions/inventoryActions";
import alertify from "alertifyjs";
import PokemonCard from "../pokemonCard/PokemonCard";

const InventoryDetail = (props) => {
  const removeFromInventory = (pokemon) => {
    props.actions.removeFromInventory(pokemon);
    alertify.error(pokemon.name + " removed");
  };

  return (
    <div>
      <div class="row">
        {props.inventory.map((poke, index) => (
          <Col xs="3">
            <PokemonCard
              key={index}
              poke={poke.pokemon}
              filter={{ currentType: { name: "All" }, searchText: "" }}
            />
            <div class="d-flex justify-content-center">
              <Button
                color="danger"
                onClick={() => removeFromInventory(poke.pokemon)}
              >
                Release
              </Button>
              <span>Quantity: {poke.quantity}</span>
            </div>
            <p></p>
          </Col>
        ))}
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromInventory: bindActionCreators(
        inventoryActions.removeFromInventory,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state) {
  return {
    inventory: state.inventoryReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryDetail);
