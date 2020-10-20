import React, { useState, useEffect } from "react";

function BankName() {
  const [bankName, setBankName] = useState("");

  useEffect(() => {
    setBankName("Test Bank");
    console.log("Test Bank");
    // return () => {
    //     cleanup
    // }
  }, []);

  return (
    <>
      <span>{`Bank Name is ${bankName}`}</span>
    </>
  );
}

export default BankName;
