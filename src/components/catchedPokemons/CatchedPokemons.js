import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as inventoryActions from "../../redux/actions/inventoryActions";

const CatchedPokemons = (props) => {
  const renderEmpty = () => {
    return (
      <NavItem>
        <NavLink>Empty</NavLink>
      </NavItem>
    );
  };

  const renderInventory = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <h5>Inventory</h5>
        </DropdownToggle>
        <DropdownMenu right>
          {props.inventory.map((item) => (
            <DropdownItem>
              {" "}
              <Badge
                color="danger"
                onClick={() => {
                  props.actions.removeFromInventory(item.pokemon);
                }}
              >
                {"X"}
              </Badge>{" "}
              {item.pokemon.name} <Badge color="success">{item.quantity}</Badge>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  return (
    <div>{props.inventory.length > 0 ? renderInventory() : renderEmpty()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CatchedPokemons);
