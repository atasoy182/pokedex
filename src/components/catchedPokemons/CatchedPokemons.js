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
import { Link } from "react-router-dom";

const CatchedPokemons = (props) => {
  const renderEmpty = () => {
    return (
      <NavItem>
        <NavLink><span className = "effect">Inventory Empty</span></NavLink>
      </NavItem>
    );
  };

  const removeFromInventory = (pokemon) => {
    props.actions.removeFromInventory(pokemon);
  };

  const renderInventory = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <span className = "effect">Inventory</span>
        </DropdownToggle>
        <DropdownMenu right>
          {props.inventory.map((item) => (
            <DropdownItem>
              {" "}
              <Badge
                color="danger"
                onClick={() => {
                  removeFromInventory(item.pokemon);
                }}
              >
                {"X"}
              </Badge>{" "}
              {item.pokemon.name} <Badge color="success">{item.quantity}</Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            {" "}
            <Link to={"/inventory"}>Inventory</Link>
          </DropdownItem>
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
