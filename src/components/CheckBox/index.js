import React from "react";

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
        />
        {props.children}
      </label>
    </>
  );
}

export default CheckBox;
