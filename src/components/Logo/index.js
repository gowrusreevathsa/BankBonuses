import React from "react";
import logo from "../../../src/logo.svg";

function Logo(props) {
  if (Object.keys(props.value) == 0) {
    console.log("Logo Loading");
    return null;
  }

  console.log("Logo Loaded");
  console.log(props.value);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
    </>
  );
}

export default Logo;
