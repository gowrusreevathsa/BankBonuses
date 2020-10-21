import React, { useState, useEffect } from "react";

function BankName() {
  const [bankName, setBankName] = useState("");
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    setBankName("Test Bank");
    console.log("Test Bank");

    var data = {
      maxRecords: 1,
    };

    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/Account_Type_Table", {
      method: "GET",
      headers: {
        Authorization: "Bearer keyBvLV6H6w7aZElG",
      },
      //   body: JSON.stringify(data),
    })
      .then((res) => {
        // console.log(res.json());
        return res.json();
      })
      .then((res) => {
        let len = res["records"].length;
        let id;
        let m_table = res["records"][0]["fields"]["Master_Table"];
        console.log(m_table);
        setBankList(m_table);
      });

    // return () => {
    //     cleanup
    // }
  }, []);

  const list = () => (
    <ul>
      {bankList.map((bank) => {
        console.log(bank);
        return <li key={bank}>{bank}</li>;
      })}
    </ul>
  );

  return (
    <>
      <span>{`Bank Name is ${bankList}`}</span>
      <ul>
        {bankList.map((bank) => {
          console.log(bank);
          return <li key={bank}>{bank}</li>;
        })}
      </ul>
    </>
  );
}

export default BankName;
