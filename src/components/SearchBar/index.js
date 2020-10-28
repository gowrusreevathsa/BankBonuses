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
        console.log(res);
        setStateList(res["records"]);
      });
  }, []);

  //   console.log(State);
  let options = stateList.map((item) => {
    console.log(item);
    console.log(item["fields"]["State_Short_Name_List"]);
    return (
      //   <option
      //     key={item["fields"]["State_Short_Name_List"]}
      //     value={item["fields"]["State_Short_Name_List"]}
      //   >
      //     {item["fields"]["State_Full_Name_List"]}
      //   </option>
      <a
        key={item["fields"]["State_Short_Name_List"]}
        value={item["fields"]["State_Short_Name_List"]}
        className="dropdown-item"
        href="#"
      >
        {item["fields"]["State_Full_Name_List"]}
      </a>
    );
  });

  return (
    <>
      <div className="center">
        <p>
          <a
            class="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Pick a location{" "}
          </a>
          {/* <select onChange={(e) => props.changeState(e.target.value)}>
            {options}
          </select> */}

          <div className="dropdown">
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              {options}
            </div>
          </div>
        </p>
      </div>
    </>
  );
}

export default SearchBar;
