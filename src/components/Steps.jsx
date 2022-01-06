import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import React from "react";
import styled from "styled-components";

const Steps = ({ page }) => {
  return (
    <StepperWrapper>
      <Stepper>
        <Step
          to="#"
          active={
            page === "shipping" || "signin" ? "shipping" || "payment" : ""
          }
        >
          1. Sign In
        </Step>
        <Step
          to="/shipping"
          active={
            (page === "shipping" && true) ||
            page === "payment" ||
            page === "placeorder"
          }
        >
          2. Shipping
        </Step>
        <Step
          to="/payment"
          data-mdb-toggle="tooltip"
          active={(page === "payment" && true) || page === "placeorder"}
          data-mdb-placement="right"
          title="Tooltip on right"
        >
          3. Payment
        </Step>
        <Step active={page === "placeorder" && true} to="/placeorder">
          4. Place Order
        </Step>
      </Stepper>
    </StepperWrapper>
  );
};

export default Steps;
const Stepper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 3rem;
  font-weight: bold;
`;
const StepperWrapper = styled.div`
  width: 100%;
`;
const Step = styled(Link)`
  width: 100%;
  color: ${(props) => (props.active ? "#1266F1" : "gray")};
  border-bottom: ${(props) => props.active && "#1266F1"} 5px solid;
  ${mobile({ fontSize: ".8rem" })}
  &:hover {
    color: blue;
  }
`;
