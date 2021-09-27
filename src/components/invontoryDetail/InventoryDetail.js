import { Card, CardBody, CardTitle, CardText, Button, Table } from "reactstrap";
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
import alertify from "alertifyjs";

const InventoryDetail = (props) => {
  const removeFromInventory = (pokemon) => {
    props.actions.removeFromInventory(pokemon);
    alertify.error(pokemon.name + " removed");
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>$</th>
          <th>NAME</th>
          <th>QUANTITY</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {console.log(props)}
        {props.inventory.map((item) => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.pokemon.name}</td>
            <td>{item.quantity}</td>
            <td>
              <Button color="danger" onClick={() => removeFromInventory(item.pokemon)}>
                {" "}
                REMOVE
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
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
