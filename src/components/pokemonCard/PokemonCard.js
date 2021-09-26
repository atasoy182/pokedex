import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export const PokemonCard = (props) => {
  const typeUrl = "https://veekun.com/dex/media/types/en/";
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
            <img
              width={150}
              height={150}
              src={props.poke.imageUrl}
              alt="..."
              class="rounded mx-auto d-block"
              style={{ "object-fit": "contain" }}
            />
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
          </CardBody>
        </Card>
      </div>
    );
  }

  return null;
};
