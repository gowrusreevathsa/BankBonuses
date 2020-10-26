import React, { useState } from "react";
import BonusReqList from "../BonusReqList";
import AccountTypeList from "../AccountTypeList";
import "./style.css";

function Filters(props) {
  return (
    <div className="sidenav">
      <form>
        <label>
          <input
            name="checking"
            value="checking"
            type="checkBox"
            onChange={(e) => props.callFunc("Checking")}
          />
          Checking
        </label>
        <br />
        <label>
          <input
            name="savings"
            value="savings"
            type="checkBox"
            onChange={(e) => props.callFunc("Savings")}
          />
          Savings
        </label>
        <br />
        <label>
          <input
            name="Checking and Savings"
            value="Checking and Savings"
            type="checkBox"
            onChange={(e) => props.callFunc("Checking and Savings")}
          />
          Checking and Savings
        </label>
      </form>

      <form>
        <label>
          <input
            name="direct"
            value="direct"
            type="checkBox"
            onChange={(e) => props.callBonus("Direct_Deposit")}
          />
          Direct Deposit
        </label>
        <label>
          <input
            name="maintenance"
            value="maintenance"
            type="checkBox"
            onChange={(e) => props.callBonus("Maintenance_Balance")}
          />
          Minimum Account Balance
        </label>
      </form>
      {/* <BonusReqList />
      <AccountTypeList /> */}
    </div>
  );
}

export default Filters;
