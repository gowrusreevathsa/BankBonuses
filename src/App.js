import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Logo from "./components/Logo";
import BankName from "./components/Name/BankName";

const MasterContext = React.createContext({});
const StateContext = React.createContext({});
const AccountContext = React.createContext({});

function App() {
  const [MasterState, setMaster] = useState({});
  const [GeoState, setGeoState] = useState({});
  const [AccountState, setAccountState] = useState({});

  useEffect(() => {
    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/Master_Table", {
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
        // let len = res["records"].length;
        // let id;
        // let m_table = res["records"][0]["fields"]["Master_Table"];
        // console.log(m_table);
        // setBankList(m_table);
        setMaster(res);
      });

    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/State_List_Table", {
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
        // let len = res["records"].length;
        // let id;
        // let m_table = res["records"][0]["fields"]["Master_Table"];
        // console.log(res);
        // setBankList(m_table);
        setGeoState(res);
      });

    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/Account_Type_Table", {
      method: "GET",
      headers: {
        Authorization: "Bearer keyBvLV6H6w7aZElG",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAccountState(res);
      });
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>Test</div> */}
      <Logo value={GeoState} />
      {/* <BankName /> */}
    </div>
  );
}

export default App;
