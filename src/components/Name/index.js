import React from "react";
import AccountName from "./AccountName";
import BankName from "./BankName";

function Name(props) {
  return (
    <>
      {/* <BankName />
      <AccountName /> */}

      <span>{props.bankName}</span>
      <span>{props.accountName}</span>
    </>
  );
}

export default Name;
