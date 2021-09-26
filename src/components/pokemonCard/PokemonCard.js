import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export const PokemonCard = (props) => {
  return (
    <div class="text-center">
      <Card>
        <img
          width={150}
          height={150}
          src={props.poke.imageUrl}
          alt="..."
          class="rounded mx-auto d-block"
          style={{ "object-fit": "contain" }}
        />
        <CardBody>
          <CardTitle>{props.poke.name}</CardTitle>
          <CardText>
            <small className="text-muted"> {props.poke.types.toString()}</small>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};
