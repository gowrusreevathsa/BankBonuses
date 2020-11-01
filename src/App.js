import React, { useState, useEffect, useRef } from "react";
// import "./App.css";
import Logo from "./components/Logo";
import BankName from "./components/Name/BankName";
import Filters from "./components/Filters";
import DetailsList from "./components/DetailsList";
import SearchBar from "./components/SearchBar";

function App() {
  // const [MasterState, setMaster] = useState({});
  // const [GeoState, setGeoState] = useState("");
  // const [Filter, setFilter] = useState({
  //   Savings: false,
  //   Checking: false,
  //   "Checking and Savings": false,
  // });
  // const [Bonus, setBonus] = useState({
  //   Direct_Deposit: true,
  //   Maintenance_Balance: true,
  // });
  // const [BinList, setBinList] = useState({});
  // const [Filtered, setFiltered] = useState([]);
  // let filteredList = [];

  // useEffect(() => {

  //   fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/Binary_List_Table", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer keyBvLV6H6w7aZElG",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       let result = {};
  //       console.log(res["records"]);
  //       for (let i in res["records"]) {
  //         console.log(i);
  //         result[res["records"][i]["fields"]["Binary_List"]] =
  //           res["records"][i]["id"];
  //       }

  //       setBinList(result);
  //     });
  // }, []);

  // useEffect(() => {
  //   let data;
  //   let filters = [];

  //   for (let i in Filter) {
  //     if (Filter[i]) {
  //       filters.push(i);
  //     }
  //   }

  //   if (filters.length == 0) {
  //     setFiltered([]);
  //   } else {
  //     fetch(
  //       "https://api.airtable.com/v0/app6tlL8Upj425dTh/Account_Type_Table",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer keyBvLV6H6w7aZElG",
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((res) => {
  //         data = res["records"];
  //         console.log("Inside IF Statement");
  //         data = res["records"].filter((item) => {
  //           console.log(item);
  //           console.log(filters.includes(item["fields"]["Account_Type_List"]));
  //           console.log(item["fields"]["Account_Type_List"]);
  //           return filters.includes(item["fields"]["Account_Type_List"]);
  //         });

  //         let masterList = [];
  //         for (let i in data) {
  //           masterList = masterList.concat(data[i]["fields"]["Master_Table"]);
  //         }

  //         setFiltered(masterList);
  //         filteredList = masterList;
  //       });
  //   }
  // }, [Filter]);

  // const changeFilter = (e) => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     [e]: !prev[[e]],
  //   }));
  // };

  // const changeBonus = (e) => {
  //   setBonus((prev) => ({
  //     ...prev,
  //     [e]: !prev[[e]],
  //   }));
  // };

  const changeState = (list) => {
    console.log("Called Change State");
    detailsRef.current.setGeo(list);
  };

  const accType = (e) => {
    console.log("Called: " + e);
    detailsRef.current.showAlert(e);
  };

  const detailsRef = useRef();

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Filters
              /*callFunc={changeFilter} callBonus={changeBonus}*/ accFunc={
                accType
              }
            />
          </div>

          <div className="col-md-10">
            <div className="col-md-12">
              <div className="col-md-11">
                <SearchBar changeState={changeState} />
              </div>
            </div>

            <div className="container">
              <div className="col-md-12">
                {/* {Object.keys(MasterState).length != 0 &&
                  Object.keys(BinList).length != 0 && ( */}
                <DetailsList
                  // data={Filtered}
                  // filter={Filtered}
                  // bonus={Bonus}
                  // binList={BinList}
                  // geoState={GeoState}
                  ref={detailsRef}
                />
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
