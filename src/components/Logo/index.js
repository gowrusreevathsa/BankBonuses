import React from "react";
import logo from "../../../src/logo.svg";

function Logo(props) {
  if (Object.keys(props.value) == 0) {
    console.log("Logo Loading");
    return null;
  }

  //   static contextType = AccountContext

  console.log("Logo Loaded");
  console.log(props.value);

  let data = props.masterData["records"];

  console.log("FILTERING");
  for (let i = 0; i < data.length; ++i) {
    if (
      props.value["records"]["2"]["fields"]["Master_Table"].includes(
        data[i]["id"]
      )
    ) {
      console.log(data[i]["id"]);
    }
  }

  console.log();

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <span>{props.value["a"]}</span>
    </>
  );
}

export default Logo;
