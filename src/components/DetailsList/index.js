import React from "react";
import DisplayCard from "../DisplayCard";

function DetailsList(props) {
  if (props == null) {
    return null;
  }

  let data = props["data"];
  let filtered = data;

  if (props["filter"].length != 0) {
    console.log(props["filter"]);
    console.log(data);
    filtered = data.filter((item) => {
      return props["filter"].includes(item["id"]);
    });
  }

  console.log("FILTERED");
  console.log(filtered);

  const cards = filtered.map((item) => {
    let bankData = {
      id: item["id"],
      bankName: item["fields"]["Bank_Name"],
      accountName: item["fields"]["Account_Name"],
      bonusAmount: item["fields"]["Bonus_Amount"],
      validity: item["fields"]["Bonus_Validity_Date"],
      bonusPayoutDate: item["fields"]["Bonus_Payout_Date"],
      accountClosureDate: item["fields"]["Account_Closure_Date"],
      directDeposit: item["fields"]["Direct_Deposit"],
      maintenanceBalance: item["fields"]["Maintenance_Balance"],
      directDepositFrequency: item["fields"]["Direct_Deposit_Frequency"],
      directDepMinOccurence: item["fields"]["Direct_Deposit_Minimum_Occurence"],
      directDepIniWindow: item["fields"]["Direct_Deposit_Initial_Window"],
      maintenanceDepIniWindow:
        item["fields"]["Maintenance_Deposit_Initial_Window"],
      directDepositAmount: item["fields"]["Direct_Deposit_Amount"],
      maintenanceBalanceAmt: item["fields"]["Maintenance_Balance_Amt"],
      maintenanceBalanceDays: item["fields"]["Maintenance_Balance_Days"],
    };

    return (
      <li key={bankData.id}>
        <DisplayCard bankData={bankData} />
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
