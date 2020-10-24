import React from "react";
import DisplayCard from "../DisplayCard";

function DetailsList(props) {
  if (props == null) {
    return null;
  }

  let data = props["data"];

  //   const cards = "TEST";
  console.log(data);

  const cards = data.map((item) => {
    let id = item["id"];
    let bankName = item["fields"]["Bank_Name"];
    let accountName = item["fields"]["Account_Name"];

    return (
      <li key={id}>
        <DisplayCard bankName={bankName} accountName={accountName} />
      </li>
    );
  });

  return (
    <>
      <ul>{cards}</ul>
    </>
  );
}

export default DetailsList;
