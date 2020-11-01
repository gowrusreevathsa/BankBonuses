import React, { useState, useEffect } from "react";
// import "./style.css";

function SearchBar(props) {
  const [stateList, setStateList] = useState([]);
  const [State, setState] = useState(["USA"]);

  useEffect(() => {
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
        setStateList(res["records"]);
      });
  }, []);

  let options = stateList.map((item) => {
    return (
      <option
        key={item["fields"]["State_Short_Name_List"]}
        value={item["fields"]["State_Short_Name_List"]}
      >
        {item["fields"]["State_Full_Name_List"]}
      </option>
    );
  });

  function changeState(e) {
    let list;

    if (e == "all") {
      list = null;
    } else {
      list = stateList.filter((item) => {
        if (item["fields"]["State_Short_Name_List"] == e) {
          return item["fields"]["Master_Table"];
        }
      });
    }

    props.changeState(list);
  }

  return (
    <>
      <div className="container">
        <label>
          Pick a location{" "}
          <select
            className="custom-select custom-select-sm "
            onChange={(e) => changeState(e.target.value)}
          >
            <option key="all" value="all">
              All
            </option>
            {options}
          </select>
        </label>
      </div>
    </>
  );
}

export default SearchBar;
