import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Spinner,
  Row,
  Badge,
  Container,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as typeActions from "../../redux/actions/typeActions";

const TypesList = (props) => {
  useEffect(() => {
    props.actions.getTypes();
  }, []);

  const selectType = (type) => {
    props.actions.changeType(type);
  };

  const getSpinner = () => {
    return (
      <Row>
        <Spinner color="primary" />
      </Row>
    );
  };

  const getBody = () => {
    return (
      <ListGroup flush>
        {props.types.map((type, index) => (
          <ListGroupItem
            active={type.id === props.currentType.id}
            key={index}
            onClick={() => selectType(type)}
          >
            {type.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };

  return (
    <Container>
      <h1>
        <Badge color="warning">TYPES</Badge>
      </h1>
      {props.isLoading ? getSpinner() : getBody()}
    </Container>
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
      changeType: bindActionCreators(typeActions.changeType, dispatch),
    },
  };
}

export default connect(mapStateToPops, mapDispatchToProps)(TypesList);
