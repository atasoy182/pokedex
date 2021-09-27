import { Form, FormGroup, Input } from "reactstrap";

export const SearchBar = (props) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormGroup>
        <Input
          onChange={(input) => props.onChange(input.target.value)}
          name="search"
          placeholder="Search"
          className="rounded"
        />
      </FormGroup>
    </Form>
  );
};
