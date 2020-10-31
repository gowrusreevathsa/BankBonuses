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
  //   console.log(props.binList["Yes"]);

  if (directDeposit == props.binList["Yes"]) {
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

  if (maintenanceBalance == props.binList["Yes"]) {
    if (directDeposit == props.binList["Yes"]) {
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

  console.log(directDeposit + " " + maintenanceBalance);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <div className="card">
              <div className="container">
                <div className="row">
                  <div className="col-2">LOGO</div>

                  <div className="col-7">
                    <div className="row">Bank Name: {bankName}</div>
                    <div className="row">Account Name: {accountName}</div>
                    <div className="row">
                      {accountClosureDate == 0 ? (
                        <p>
                          You can close the bank account once you receive the
                          bonus
                        </p>
                      ) : (
                        <p>
                          <br />
                          {details}
                          <br /> <br />
                          {bonusAmount} will be paid in {bonusPayoutDate} days
                          after the bonus requirements are met. You must keep
                          the bank account(s) open for {accountClosureDate} days
                          from the date of account opening.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-3">
                    <div className="row">Bonus Amount: {bonusAmount}</div>
                    {validity != null && (
                      <div className="row">Validity: {validity}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayCard;
