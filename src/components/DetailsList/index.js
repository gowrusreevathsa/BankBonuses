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
    },

    setBonus(e) {
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
        for (let i in res["records"]) {
          result[res["records"][i]["fields"]["Binary_List"]] =
            res["records"][i]["id"];
        }

        setBinList(result);
      });
  }, []);

  //Filter the data
  useEffect(() => {
    let data;
    let filters = [];

    for (let i in Filter) {
      if (Filter[i]) {
        filters.push(i);
      }
    }

    if (filters.length == 0) {
      setFilterList([]);
      setFiltered(Master);
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
          data = res["records"];
          data = res["records"].filter((item) => {
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
    if (Filtered[0] && Object.keys(Filtered[0]).length != 0) {
      let data = Filtered;
      if (FilterList.length != 0) {
        data = Filtered.filter((item) => {
          return FilterList.includes(item["id"]);
        });
      }

      if (GeoFilterList.length != 0) {
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
    }
  }, [Filtered, FilterList, GeoFilterList, BinList, BonusList]);

  return (
    <>
      <ul style={{ listStyle: "none" }}>{Data}</ul>
    </>
  );
});

export default DetailsList;
