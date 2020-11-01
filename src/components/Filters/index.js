import React, { useState, useEffect } from "react";
import "./style.css";
import CheckBox from "../CheckBox";

function Filters(props) {
  const testfunc = (e) => {
    props.accFunc(e);
  };

  const bonusFunc = (e) => {
    props.callBonus(e);
  };

  return (
    <div className="container">
      <div className="row">
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
            <CheckBox
              name="Direct_Deposit"
              value="Direct Deposit"
              func={bonusFunc}
              defaultChecked="true"
            >
              Direct Deposit
            </CheckBox>
            <br />
            <CheckBox
              name="Maintenance_Balance"
              value="Minimum Account Balance"
              func={bonusFunc}
              defaultChecked="true"
            >
              Minimum Account Balance
            </CheckBox>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Filters;
