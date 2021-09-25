import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as typeActions from "../../redux/actions/typeActions";

const TypesList = (props) => {
  useEffect(() => {
    props.actions.getTypes();
  }, []);

  return (
    <div>
      <h1>TYPES</h1>
      <h5>CurrentType : {props.currentType.typeName}</h5>
      {props.isLoading ? (
        <h1>YUKLENİYOR</h1>
      ) : (
        <ListGroup>
          {props.types.map((type, index) => (
            <ListGroupItem key={index}>{type.name}</ListGroupItem>
          ))}
        </ListGroup>
      )}

      <h5>{props.types.length}</h5>
    </div>
  );
};

function mapStateToPops(state) {
  return {
    currentType: state.changeTypeReducer,
    types: state.typeListReducer.allTypes,
    isLoading: state.typeListReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getTypes: bindActionCreators(typeActions.getTypes, dispatch),
    },
  };
}

export default connect(mapStateToPops, mapDispatchToProps)(TypesList);
