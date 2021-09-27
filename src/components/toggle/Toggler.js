import React from "react";
import { func, string } from "prop-types";
import { CustomInput, Row } from "reactstrap";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Row style={{ padding: 5 }}>
      <CgSun size={20} style={{ marginRight: 5 }} />
      <CustomInput
        bsSize="lg"
        onChange={toggleTheme}
        type="switch"
        id="exampleCustomSwitch"
        name="customSwitch"
      />
      <HiMoon size={20} />
    </Row>
  );
};
Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};
export default Toggle;
