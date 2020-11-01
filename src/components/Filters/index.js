import React, { useState, useEffect } from "react";
import "./style.css";
import CheckBox from "../CheckBox";

function Filters(props) {
  //   const [checkDirect, setcheckDirect] = useState(true);
  //   const [checkMin, setcheckMin] = useState(true);

  //   useEffect(() => {
  //     props.callBonus("Direct_Deposit");
  //   }, [checkDirect]);

  const testfunc = (e) => {
    console.log("TEST: " + e);
    props.accFunc(e);
  };

  return (
    <div className="sidenav">
      <form>
        <span className="filterTitle">ACCOUNT TYPE</span>
        <br />
        <CheckBox name="Checking" value="checking" func={testfunc}>
          Checking
        </CheckBox>
        <br />
        <CheckBox name="Savings" value="savings" func={testfunc}>
          Savings
        </CheckBox>
        <br />
        <CheckBox
          name="Checking and Savings"
          value="Checking and Savings"
          func={testfunc}
        >
          Checking and Savings
        </CheckBox>
        <br />
      </form>
      <br />
      <br />
      <form>
        <span className="filterTitle">BONUS REQUIREMENTS</span>
        <CheckBox name="Direct Deposit" value="Direct Deposit" func={testfunc}>
          Direct Deposit
        </CheckBox>
        <br />
        <CheckBox
          name="Minimum Account Balance"
          value="Minimum Account Balance"
          func={testfunc}
        >
          Checking and Savings
        </CheckBox>

        {/* <label>
          <input
            checked={checkDirect}
            name="direct"
            value="direct"
            type="checkBox"
            // onChange={(e) => {
            //   setcheckDirect((prev) => !prev);
            //   props.callBonus("Direct_Deposit");
            // }}
          />
          Direct Deposit
        </label>
        <label>
          <input
            checked={checkMin}
            name="maintenance"
            value="maintenance"
            type="checkBox"
            // onChange={(e) => {
            //   setcheckMin((prev) => !prev);
            //   props.callBonus("Maintenance_Balance");
            // }}
          />
          Minimum Account Balance
        </label> */}
      </form>
    </div>
  );
}

export default Filters;
