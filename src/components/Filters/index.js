import React, { useState, useEffect } from "react";
import BonusReqList from "../BonusReqList";
import AccountTypeList from "../AccountTypeList";
import "./style.css";

function Filters(props) {
  const [checkDirect, setcheckDirect] = useState(true);
  const [checkMin, setcheckMin] = useState(true);

  function test() {
    props.callBonus("Direct_Deposit");
  }

  useEffect(() => {
    props.callBonus("Direct_Deposit");
  }, [checkDirect]);

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
            checked={checkDirect}
            name="direct"
            value="direct"
            type="checkBox"
            onChange={(e) => {
              setcheckDirect((prev) => !prev);
            }}
          />
          Direct Deposit
        </label>
        <label>
          <input
            checked={checkMin}
            name="maintenance"
            value="maintenance"
            type="checkBox"
            onChange={(e) => {
              setcheckMin((prev) => !prev);
              props.callBonus("Maintenance_Balance");
            }}
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
