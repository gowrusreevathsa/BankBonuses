import React from "react";
import "./style.css";

function CheckBox(props) {
  return (
    <>
      <label>
        <input
          name={props.name}
          value={props.value}
          type="checkBox"
          //   onChange={(e) => props.callFunc("Checking")}
          onChange={(e) => props.func(props.name)}
          defaultChecked={props.defaultChecked}
          className="checkbox-round"
        />{" "}
        {props.children}
      </label>
    </>
  );
}

export default CheckBox;
