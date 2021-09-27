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
import * as favActions from "../../redux/actions/favActions";
import alertify from "alertifyjs";

const Fovorites = (props) => {
  const renderEmpty = () => {
    return (
      <NavItem>
        <NavLink>
          <span className="effect">Fav Empty</span>
        </NavLink>
      </NavItem>
    );
  };

  const removeFromFav = (pokemon) => {
    let showSuccessAlert = true;
    if (props.fav.find((poke) => poke.id === pokemon.id)) {
      showSuccessAlert = false;
    }
    props.actions.addOrRemoveFav(pokemon);
    if (showSuccessAlert) {
      alertify.success(pokemon.name + " added to favorites");
    } else {
      alertify.error(pokemon.name + " removed from favorites");
    }
  };

  const renderInventory = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <span className="effect">Favorites</span>
        </DropdownToggle>
        <DropdownMenu right>
          {props.fav.map((item) => (
            <DropdownItem>
              {" "}
              <Badge
                color="danger"
                onClick={() => {
                  removeFromFav(item);
                }}
              >
                {"X"}
              </Badge>{" "}
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  return <div>{props.fav.length > 0 ? renderInventory() : renderEmpty()}</div>;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addOrRemoveFav: bindActionCreators(favActions.addOrRemoveFav, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    fav: state.favReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fovorites);
