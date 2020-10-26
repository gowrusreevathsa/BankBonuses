import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Logo from "./components/Logo";
import BankName from "./components/Name/BankName";
import Filters from "./components/Filters";
import DetailsList from "./components/DetailsList";

const MasterContext = React.createContext({});
const StateContext = React.createContext({});
const AccountContext = React.createContext({});

function App() {
  const [MasterState, setMaster] = useState({});
  const [GeoState, setGeoState] = useState({});
  const [AccountState, setAccountState] = useState({});
  const [VarAccState, setVarAccState] = useState({});
  const [Filter, setFilter] = useState({
    Savings: false,
    Checking: false,
    "Checking and Savings": false,
  });

  console.log("Filter: " + Filter["Savings"]);

  const [Filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/Master_Table", {
      method: "GET",
      headers: {
        Authorization: "Bearer keyBvLV6H6w7aZElG",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMaster(res);
      });

    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/State_List_Table", {
      method: "GET",
      headers: {
        Authorization: "Bearer keyBvLV6H6w7aZElG",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setGeoState(res);
      });
  }, []);

  useEffect(() => {
    let data;
    let filters = [];

    for (let i in Filter) {
      if (Filter[i]) {
        filters.push(i);
        console.log("Inside Loop" + i);
      }
    }

    if (filters.length == 0) {
      setFiltered([]);
    } else {
      fetch(
        "https://api.airtable.com/v0/app6tlL8Upj425dTh/Account_Type_Table",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer keyBvLV6H6w7aZElG",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // setAccountState(res);
          console.log("Changing State");
          console.log(res["records"]); //["0"]["fields"]["Master_Table"]);

          data = res["records"];
          // let filterList = Filter
          // if (Filter[e]) {
          console.log("Inside IF Statement");
          data = res["records"].filter((item) => {
            console.log(item);
            console.log(filters.includes(item["fields"]["Account_Type_List"]));
            console.log(item["fields"]["Account_Type_List"]);
            return filters.includes(item["fields"]["Account_Type_List"]);
          });
          // }

          let masterList = [];
          for (let i in data) {
            console.log(data[i]);
            masterList = masterList.concat(data[i]["fields"]["Master_Table"]);
          }

          console.log("List: " + masterList);
          setFiltered(masterList);
        });
    }
  }, [Filter]);

  const changeHandle = (e) => {
    for (let i in Filter) {
      console.log("handle1: " + i + " " + Filter[i]);
    }
    setFilter((prev) => ({
      ...prev,
      [e]: !prev[[e]],
    }));

    for (let i in Filter) {
      console.log("handle2: " + i + " " + Filter[i]);
    }
  };

  return (
    <div className="App">
      <Filters callFunc={changeHandle} />

      {Object.keys(MasterState).length != 0 && (
        <DetailsList data={MasterState["records"]} filter={Filtered} />
      )}
    </div>
  );
}

export default App;
