import React from "react";
import Name from "../Name";
import { Col, Card, CardTitle } from "reactstrap";
import "./styles.css";

function DisplayCard(props) {
  let {
    id,
    bankName,
    accountName,
    bonusAmount,
    validity,
    accountClosureDate,
    bonusPayoutDate,
    directDeposit,
    directDepositFrequency,
    directDepositAmount,
    directDepIniWindow,
    directDepMinOccurence,
    maintenanceBalance,
    maintenanceDepIniWindow,
    maintenanceBalanceAmt,
    maintenanceBalanceDays,
  } = props.bankData;

  let details = "";
  if (directDeposit == "Yes") {
    if (directDepositFrequency == "Once") {
      details = `You are required to get at least one direct deposit of an amount greater\
        than ${directDepositAmount} within\
        ${directDepIniWindow} days of opening the account.`;
    } else if (directDepositFrequency == "Monthly") {
      details = `You are required to get (Direct_Deposit_Mimimum_Occurence) monthly\
        direct deposits such that direct deposits in aggregate exceeds\
         ${directDepositAmount} every month for minimum of\
        ${directDepMinOccurence} months. The first monthly direct\
        deposit should be met within ${directDepIniWindow} days of\
        opening the account.`;
    } else if (directDepositFrequency == "Aggregate") {
      if (directDepMinOccurence > 1) {
        details = `You are required to get a
            minimum of
            ${directDepMinOccurence} direct deposits such that
            in aggregate you deposit ${directDepositAmount}. The
            first direct deposit should be
            made in ${directDepIniWindow}
            days from the account opening
            date.`;
      } else if (directDepMinOccurence == 1) {
        details = `You are required, in aggregate,
            to get ${directDepositAmount}
            in direct deposits. The first direct
            deposit should be made in
            ${directDepIniWindow}
            days from the account opening
            date.`;
      }
    }
  }

  details += "\n";

  if (maintenanceBalance == "Yes") {
    if (directDeposit == "Yes") {
      if (maintenanceDepIniWindow > 0) {
        details += `You are also required to deposit ${maintenanceBalanceAmt} in new
            money within
            ${maintenanceDepIniWindow} days of opening the account
            and maintain the daily average
            account balance for
            ${maintenanceBalanceDays} days.`;
      } else if (maintenanceDepIniWindow == 0) {
        details += `You are also required to open the
            account with a deposit of ${maintenanceBalanceAmt} in
            new money and maintain the daily
            average account balance for
            ${maintenanceBalanceDays} days.`;
      }
    } else {
      if (maintenanceDepIniWindow > 0) {
        details = `You are required to deposit ${maintenanceBalanceAmt} in new
            money within
            ${maintenanceDepIniWindow} days of opening the account
            and maintain the daily average
            account balance for
            ${maintenanceBalanceDays} days.`;
      } else if (maintenanceDepIniWindow == 0) {
        details = `You are required to open the
            account with a deposit of ${maintenanceBalanceAmt} in new
            money and maintain the daily
            average account balance for
            ${maintenanceBalanceDays} days.`;
      }
    }
  }

  return (
    <>
      {/* <Name bankName="" accountName="" /> */}

      {/* <Col sm="6">
        <Card body>
          <CardTitle>
            {bankName}
            <br />
            {accountName}
          </CardTitle>
        </Card>
      </Col> */}

      <div className="container">
        Bank Name: {bankName}, Account Name: {accountName}, Bonus Amount:{" "}
        {bonusAmount}, Validity: {validity}
        {accountClosureDate == 0 ? (
          <span>You can close the bank account once you receive the bonus</span>
        ) : (
          <p>
            {details}
            <br />
            {bonusAmount} will be paid in {bonusPayoutDate} days after the bonus
            requirements are met. You must keep the bank account(s) open for
            {accountClosureDate} days from the date of account opening.
          </p>
        )}
      </div>
    </>
  );
}

export default DisplayCard;
