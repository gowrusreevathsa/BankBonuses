import React from "react";
import Name from "../Name";
import { Col, Card } from "reactstrap";

function DisplayCard(props) {
  return (
    <>
      {/* <Name bankName="" accountName="" /> */}

      <Col sm="6">
        <Card body>
          {props.bankName}, {props.accountName}
        </Card>
      </Col>
    </>
  );
}

export default DisplayCard;
