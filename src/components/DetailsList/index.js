import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import DisplayCard from "../DisplayCard";

const DetailsList = forwardRef((props, ref) => {
  const [Master, setMaster] = useState([]);
  const [Filtered, setFiltered] = useState([]);
  const [Data, setData] = useState(<div></div>);
  const [Filter, setFilter] = useState({
    Checking: false,
    Savings: false,
    "Checking and Savings": false,
  });
  const [FilterList, setFilterList] = useState([]);
  const [GeoFilterList, setGeoFilterList] = useState([]);
  const [BinList, setBinList] = useState({});
  const [BonusList, setBonusList] = useState({
    Direct_Deposit: true,
    Maintenance_Balance: true,
  });

  useImperativeHandle(ref, () => ({
    showAlert(e) {
      console.log("ALERT: " + e);
      setFilter((prev) => ({
        ...prev,
        [e]: !prev[[e]],
      }));
    },

    setGeo(list) {
      if (list == null) {
        setGeoFilterList(FilterList);
      } else if (list.length == 0) {
        setData(<div>Sorry, we did not find any result :(</div>);
      } else {
        setGeoFilterList(list[0]["fields"]["Master_Table"]);
      }

      console.log(list);
    },

    setBonus(e) {
      console.log("BONUS CALLED: " + e);
      setBonusList((prev) => ({
        ...prev,
        [e]: !prev[[e]],
      }));
    },
  }));

  //Master Table Data
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
        console.log(res);
        setMaster(res["records"]);
        setFiltered(res["records"]);
      });

    fetch("https://api.airtable.com/v0/app6tlL8Upj425dTh/Binary_List_Table", {
      method: "GET",
      headers: {
        Authorization: "Bearer keyBvLV6H6w7aZElG",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let result = {};
        console.log(res["records"]);
        for (let i in res["records"]) {
          console.log(i);
          result[res["records"][i]["fields"]["Binary_List"]] =
            res["records"][i]["id"];
        }

        console.log(result);
        setBinList(result);
      });
  }, []);

  // let data = props["data"];
  // let filtered = data;

  // if (props["filter"].length != 0) {
  //   console.log(props["filter"]);
  //   console.log(data);
  //   filtered = data.filter((item) => {
  //     return props["filter"].includes(item["id"]);
  //   });
  // }

  // data = filtered;

  // for (let i in props["bonus"]) {
  //   console.log(i);
  //   if (props["bonus"][i]) {
  //     console.log("Item True: " + i);
  //     filtered = data.filter((item) => {
  //       return item["fields"][i] == props.binList["Yes"];
  //     });
  //   } else {
  //     console.log("Item False: " + i);
  //     filtered = data.filter((item) => {
  //       return item["fields"][i] == props.binList["No"];
  //     });
  //   }
  //   data = filtered;
  // }

  // console.log("Geo: " + props["geoState"]);

  // console.log("FILTERED");
  // console.log(filtered);

  // const cards = filtered.map((item) => {
  //   let bankData = {
  //     id: item["id"],
  //     bankName: item["fields"]["Bank_Name"],
  //     accountName: item["fields"]["Account_Name"],
  //     bonusAmount: item["fields"]["Bonus_Amount"],
  //     validity: item["fields"]["Bonus_Validity_Date"],
  //     bonusPayoutDate: item["fields"]["Bonus_Payout_Date"],
  //     accountClosureDate: item["fields"]["Account_Closure_Date"],
  //     directDeposit: item["fields"]["Direct_Deposit"],
  //     maintenanceBalance: item["fields"]["Maintenance_Balance"],
  //     directDepositFrequency: item["fields"]["Direct_Deposit_Frequency"],
  //     directDepMinOccurence: item["fields"]["Direct_Deposit_Minimum_Occurence"],
  //     directDepIniWindow: item["fields"]["Direct_Deposit_Initial_Window"],
  //     maintenanceDepIniWindow:
  //       item["fields"]["Maintenance_Deposit_Initial_Window"],
  //     directDepositAmount: item["fields"]["Direct_Deposit_Amount"],
  //     maintenanceBalanceAmt: item["fields"]["Maintenance_Balance_Amt"],
  //     maintenanceBalanceDays: item["fields"]["Maintenance_Balance_Days"],
  //     state: item["fields"]["State_Short_Name"],
  //   };

  //   return (
  //     <li key={bankData.id}>
  //       <DisplayCard bankData={bankData} bonus={props.bonus} />
  //     </li>
  //   );
  // });

  //Filter the data
  useEffect(() => {
    let data;
    let filters = [];

    console.log("INSIDE EFFECT");
    console.log("INSIDE: " + Master);
    console.log("INSIDE: " + Filtered);

    for (let i in Filter) {
      if (Filter[i]) {
        filters.push(i);
      }
    }

    if (filters.length == 0) {
      setFilterList([]);
      setFiltered(Master);
      // setForceRender((prev) => !prev);
      console.log("INSIDE IF: " + Master);
    } else {
      console.log("INSIDE ELSE");
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
          data = res["records"];
          console.log("Inside IF Statement");
          data = res["records"].filter((item) => {
            console.log(item);
            console.log(filters.includes(item["fields"]["Account_Type_List"]));
            console.log(item["fields"]["Account_Type_List"]);
            return filters.includes(item["fields"]["Account_Type_List"]);
          });

          let masterList = [];
          for (let i in data) {
            masterList = masterList.concat(data[i]["fields"]["Master_Table"]);
          }

          setFilterList(masterList);
        });
    }
  }, [Filter, Master]);

  let cards = <div>DEFAULT</div>;
  useEffect(() => {
    console.log("FILTERED");
    if (Filtered[0] && Object.keys(Filtered[0]).length != 0) {
      console.log(Filtered);

      let data = Filtered;
      if (FilterList.length != 0) {
        console.log(FilterList);
        data = Filtered.filter((item) => {
          return FilterList.includes(item["id"]);
        });
      }

      if (GeoFilterList.length != 0) {
        console.log(GeoFilterList);
        data = data.filter((item) => {
          return GeoFilterList.includes(item["id"]);
        });
      }

      // Bonus filter
      let bonFilList = [];
      for (let i in BonusList) {
        if (BonusList[i]) {
          bonFilList.push(i);
        }
      }
      if (bonFilList.length == 0) {
        //Do nothing
      } else {
        for (let i in bonFilList) {
          data = data.filter((item) => {
            return item["fields"][bonFilList[0]] == BinList["Yes"];
          });
        }
        console.log(data);
      }

      cards = data.map((item) => {
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
          directDepMinOccurence:
            item["fields"]["Direct_Deposit_Minimum_Occurence"],
          directDepIniWindow: item["fields"]["Direct_Deposit_Initial_Window"],
          maintenanceDepIniWindow:
            item["fields"]["Maintenance_Deposit_Initial_Window"],
          directDepositAmount: item["fields"]["Direct_Deposit_Amount"],
          maintenanceBalanceAmt: item["fields"]["Maintenance_Balance_Amt"],
          maintenanceBalanceDays: item["fields"]["Maintenance_Balance_Days"],
          state: item["fields"]["State_Short_Name"],
          link: item["fields"]["Link"],
        };

        return (
          <li key={bankData.id}>
            <DisplayCard bankData={bankData} binList={BinList} />
          </li>
        );
      });
      setData(cards);
      console.log(cards.length);
    }
  }, [Filtered, FilterList, GeoFilterList, BinList, BonusList]);

  return (
    <>
      <ul style={{ listStyle: "none" }}>{Data}</ul>
    </>
  );
});

export default DetailsList;
