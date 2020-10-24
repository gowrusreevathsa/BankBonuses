import React from "react";
import BonusReqList from "../BonusReqList";
import AccountTypeList from "../AccountTypeList";

function Filters(props) {
  return (
    <>
      <button onClick={props.callFunc} value="Click Me">
        Click Me
      </button>

      <form>
        <label>
          <input name="checking" type="checkBox" onChange={props.callFunc} />
          Checking
        </label>
      </form>
      {/* <BonusReqList />
      <AccountTypeList /> */}
    </>
  );
}

export default Filters;
