import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { useNavigation } from "@react-navigation/native";
import { ColorPalette, Size } from "../../../appStyles";
import CustomDropdown from "../../components/CustomDropdown";
import CustomButton from "../../components/CustomButton";
import Global from "../../../global";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomTopbar from "../../components/CustomTopbar/CustomTopbar";
import axios from "axios";

const screenTitle = "Expenses";

// fn to controll the rendering of the component (user data):
// 2 TextInput (user's share & user's already paid amount) + 1 Text components (show payments and debts)

const RenderComponent = (props) => {
  // rounding function
  const roundTo = function (number, places) {
    let isnum = /\,?\d+\,?|\.?\d+\.?/.test(number);
    if (isnum) {
      let numToString = number.toString();
      let realNumber = parseFloat(numToString.replace(/,/g, "."));
      return +(Math.round(realNumber + "e+" + places) + "e-" + places);
    } else {
      console.log("what we get from the UI: ", number);
    }
  };

  // the view of the component
  return (
    <View key={props.index} style={{ margin: 0 }}>
      <View style={styles.itemContainer}>
        <Text style={styles.userName}>
          {" "}
          {props.data[props.index].userName}'s share{" "}
        </Text>
        <TextInput
          style={
            props.checkShares
              ? styles.otherTextInput
              : [
                  styles.otherTextInput,
                  { borderColor: ColorPalette.primaryOrange, borderWidth: 3 },
                ]
          }
          name="toPay"
          keyboardType="decimal-pad"
          defaultValue={props.data[props.index].toPay.toString()}
          onChangeText={(e) => {
            console.log("valor introducido: ", typeof e);
            let ix = props.index;
            let fieldName = "toPay";
            let newValue = e === "" ? "0" : roundTo(e, 2);
            console.log("newValue introducido: ", newValue);
            let paid = props.data[props.index].alreadyPaid
              ? roundTo(props.data[props.index].alreadyPaid, 2)
              : 0;
            let owe = !isNaN(paid / newValue) && paid / newValue >= 1 ? 0 : 1;

            let newData = [...props.data];
            newData[ix] = {
              ...newData[ix],
              [fieldName]: newValue.toString(),
              owe: owe,
              settleSharing:
                owe == 0
                  ? (paid - newValue).toString()
                  : (newValue - paid).toString(),
            };
            props.setData(newData);
          }}
        ></TextInput>
      </View>

      <View style={[styles.itemContainer]}>
        <Text style={[styles.paymentConcepts]}>Already paid</Text>
        <TextInput
          style={
            props.checkPaid
              ? styles.otherTextInput
              : [
                  styles.otherTextInput,
                  { borderColor: ColorPalette.primaryOrange, borderWidth: 3 },
                ]
          }
          name="alreadyPaid"
          keyboardType="decimal-pad"
          defaultValue={props.data[props.index].alreadyPaid.toString()}
          onChangeText={(e) => {
            let ix = props.index;
            let fieldName = "alreadyPaid";
            let newValue = e === "" ? "0" : roundTo(e, 2);
            let toPay = props.data[props.index].toPay
              ? roundTo(props.data[props.index].toPay, 2)
              : 0;
            let owe = !isNaN(newValue / toPay) && newValue / toPay >= 1 ? 0 : 1;

            let newData = [...props.data];
            newData[ix] = {
              ...newData[ix],
              [fieldName]: newValue.toString(),
              owe: owe,
              settleSharing:
                owe == 0
                  ? roundTo(
                      (isNaN(newValue) ? 0 : newValue) - toPay,
                      2
                    ).toString()
                  : roundTo(
                      toPay - (isNaN(newValue) ? 0 : newValue),
                      2
                    ).toString(),
            };
            props.setData(newData);
          }}
        ></TextInput>
      </View>

      <View style={[styles.itemContainer]}>
        <Text style={[styles.paymentConcepts]}>
          {props.data[props.index].owe == 0
            ? `Settled receiving`
            : `Settled paying`}
        </Text>
        <Text
          name="settleSharing"
          style={[
            styles.plainTextInput,
            props.data[props.index].owe == 0 ? styles.excess : styles.owe,
          ]}
        >
          {props.data[props.index].settleSharing
            ? props.data[props.index].settleSharing
            : 0}
        </Text>
      </View>
      <Text
        style={{
          backgroundColor: ColorPalette.primaryGray,
          height: 1,
          marginBottom: 15,
          marginTop: 10,
        }}
      ></Text>
    </View>
  );
};

// the component ...
const ExprensesScreen = () => {
  const TEXT_REGEX = /^[a-zA-Z0-9_ ]*$/;
  const NUMBER_REGEX = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
  const [collapsCategory, setCollapsCategory] = useState(true);
  const [collapsTitle, setCollapsTitle] = useState(true);
  const [collapsNotes, setCollapsNotes] = useState(true);

  const [expTotal, setExpTotal] = useState(null);
  const [CategoryList, setCategoryList] = useState(null);
  const [expenseCategory, setExpenseCategory] = useState(null);
  const [expenseTitle, setExpenseTitle] = useState(null);
  const [expenseNotes, setExpenseNotes] = useState(null);
  const [groupMembres, setGroupMembres] = useState(null);
  const [userShareArray, setUserShareArray] = useState([]);

  const [sumsCheck, setSumsCheck] = useState(false);
  const [readyToPost, setReadyToPost] = useState(false);
  const [proceed, setProceed] = useState(null);
  const [checkPaid, setCheckPaid] = useState(false);
  const [checkShares, setCheckShares] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  let title = "";
  // toggle sections
  const toggleCategory = () => {
    setCollapsCategory(!collapsCategory);
  };
  const toggleTitle = () => {
    setCollapsTitle(!collapsTitle);
  };
  const toggleNotes = () => {
    setCollapsNotes(!collapsNotes);
  };

  // navigation
  const navigation = useNavigation();
  const onPressAdd = () => {
    navigation.navigate("ExpensesAdd");
  };
  const onPressList = () => {
    navigation.navigate("Expenses");
  };

  /* both work like a charm ...
		collecting the group id from the router 
		1) using the route to capture the params
		2) using the value store in the Global variable
	*/

  //console.log('del route: ', route?.params?.groupId)
  //console.log('de Global: ', Global.currentGroupId)
  let currentGroupId = Global.currentGroupId;
  // gets the members of the group by calling the API
  const loadUserByGroupId = async () => {
    axios
      //.get(`${Global.server}/groups/${oute?.params?.groupId}`, {})
      .get(`${Global.server}/groups/${Global.currentGroupId}`, {})
      .then(function (response) {
        setGroupMembres(response.data.results[0]?.users);
        //console.log('the json object', groupMembres)
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  // calls the API with every new group id
  useEffect(() => {
    loadUserByGroupId();
  }, [currentGroupId]);

  //Loading categories
  const loadCategories = async () => {
    const response = await fetch(`${Global.server}/categories/`);
    const json = await response.json();
    setCategoryList(json);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // updates the category in response to user interaction
  useEffect(() => {
    setCollapsCategory(!collapsCategory);
  }, [expenseCategory]);

  // date and hour to build a title
  let date = new Date();
  let formatedDay =
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    "h";

  // rounding function
  const roundTo = function (number, places) {
    let isnum = /\,?\d+\,?|\.?\d+\.?/.test(number);
    if (isnum) {
      let numToString = number.toString();
      let realNumber = parseFloat(numToString.replace(/,/g, "."));
      return +(Math.round(realNumber + "e+" + places) + "e-" + places);
    } else {
      console.log("what did we get from the UI? ", number);
    }
  };

  // distribute payments
  const distributePayments = (groupMembres, expTotal) => {
    let totalAmount = "";
    let sharesArray = [];
    let idUserShareArray = [];
    let roundedShare = 0;

    // building the array of objects with the shares to pay by each member
    if (groupMembres && expTotal) {
      totalAmount = parseFloat(expTotal); //roundTo(expTotal, 2);
      let numberOfMembers = groupMembres.length;
      if (numberOfMembers > 0) {
        console.log(typeof (totalAmount / numberOfMembers));
        roundedShare = roundTo(totalAmount / numberOfMembers, 2);
        for (let i = 0; i < numberOfMembers; i++) {
          sharesArray.push({
            toPay: roundedShare.toString() ? roundedShare.toString() : 0,
            alreadyPaid: "",
            owe: 1,
            settleSharing: roundedShare.toString()
              ? roundedShare.toString()
              : 0,
          });
        }
        idUserShareArray = groupMembres.map(function (item, index) {
          return { id: item._id, userName: item.name, ...sharesArray[index] };
        });

        setUserShareArray(idUserShareArray);
      } else {
        // Users could take a shortcut and enter the number of people
        // with which she or he wants to share a spending
        // feature not so hard to implement

        aler("You need to invite friends and create groups first");
      }
    }
  };
  //console.log("user payment share: ", userShareArray);

  // arranging payments and debts

  const arrangePayments_fn = (userShareArray) => {
    let noDebtArray = [];
    let usersOwing = [];
    let ArrangePaymentsTemp = [];
    let arrangePaymentsArray = [];
    if (userShareArray) {
      noDebtArray = userShareArray.filter((obj) => obj.owe == 0);
      console.log("NO debts array: ", noDebtArray);
      if (noDebtArray.length == 1) {
        usersOwing = userShareArray.filter((obj) => obj.owe == 1);
        ArrangePaymentsTemp = usersOwing.map((obj) => {
          return {
            date: date,
            userFromId: obj.id,
            userFromName: obj.userName,
            userToId: noDebtArray[0].id,
            userToName: noDebtArray[0].userName,
            quantity:
              parseFloat(obj.toPay) -
              ((obj.alreadyPaid == "") | (parseFloat(obj.alreadyPaid) == "0")
                ? 0
                : parseFloat(obj.alreadyPaid)),
          };
        });
        arrangePaymentsArray = ArrangePaymentsTemp.filter(
          (obj) => obj.quantity > 0
        );
        return arrangePaymentsArray;
      } else {
        noDebtArray = userShareArray.filter((obj) => obj.owe == 0);
        usersOwing = userShareArray.filter((obj) => obj.owe == 1);
        let numberOfPayers = noDebtArray.length;
        let numberOfOwers = usersOwing.length;

        for (let i = 0; i < noDebtArray.length; i++) {
          let toId = noDebtArray[i].id;
          let toName = noDebtArray[i].userName;

          if (numberOfOwers == 1) {
            for (let j = 0; j < usersOwing.length; j++) {
              let fromId = usersOwing[j].id;
              let fromName = usersOwing[j].userName;
              let amount =
                (usersOwing[j].alreadyPaid == "") |
                (parseFloat(usersOwing[j].alreadyPaid) == "0")
                  ? parseFloat(usersOwing[j].toPay) / numberOfPayers
                  : (parseFloat(usersOwing[j].toPay) -
                      parseFloat(usersOwing[j].alreadyPaid)) /
                    numberOfPayers;

              arrangePaymentsArray.push({
                date: date,
                userFromId: fromId,
                userFromName: fromName,
                userToId: toId,
                userToName: toName,
                quantity: amount,
              });
            }
          } else {
            for (let j = 0; j < usersOwing.length; j++) {
              let fromId = usersOwing[j].id;
              let fromName = usersOwing[j].userName;
              let amount =
                (usersOwing[j].alreadyPaid == "") |
                (parseFloat(usersOwing[j].alreadyPaid) == "0")
                  ? parseFloat(usersOwing[j].toPay)
                  : parseFloat(usersOwing[j].toPay) -
                    parseFloat(usersOwing[j].alreadyPaid);

              arrangePaymentsArray.push({
                date: date,
                userFromId: fromId,
                userFromName: fromName,
                userToId: toId,
                userToName: toName,
                quantity: amount,
              });
            }
          }
        }
        return arrangePaymentsArray;
      }
    }
  };

  // updates the calculation (shares) with every change in the total expense
  useEffect(() => {
    distributePayments(groupMembres, expTotal);
  }, [expTotal]);

  // updates the component so the changes in the styles take effect
  useEffect(() => {
    RenderComponent;
  }, [checkPaid, checkShares]);

  // makes sure that the shares and the already paid amounts equals the total expense
  // provides the state to change styles of the component
  const checkSums = (userShareArray, expTotal) => {
    let total = roundTo(expTotal, 2);
    let sumShares = 0;
    let sumPaid = 0;
    userShareArray
      ? userShareArray.forEach((obj) => {
          sumShares += parseFloat(obj.toPay) ? parseFloat(obj.toPay) : 0;
          sumPaid += parseFloat(obj.alreadyPaid)
            ? parseFloat(obj.alreadyPaid)
            : 0;
        })
      : null;
    console.log(
      "sum paid: ",
      sumPaid,
      "sum of shares: ",
      sumShares,
      " total: ",
      total
    );

    if (total == sumPaid) {
      setCheckPaid(true);
    } else {
      setCheckPaid(false);
    }

    if (total == sumShares) {
      setCheckShares(true);
    } else {
      setCheckShares(false);
    }

    if (sumPaid == total && sumShares == total) {
      setSumsCheck(true);
    } else {
      setSumsCheck(false);
    }
  };

  // make sure that all pieces of data are available to make the post
  const checkDataComplete = (
    expenseCategory,
    userShareArray,
    expTotal,
    currentGroupId
  ) => {
    console.log("\n\n the category: ", expTotal);
    if (expenseCategory) {
      if (
        expenseCategory.property != "Unknown" &&
        userShareArray &&
        expTotal &&
        currentGroupId
      ) {
        setReadyToPost(true);
      } else {
        setReadyToPost(false);
      }
    }
  };
  //console.log('category: ', expenseCategory)

  console.log("sumsCheck: ", sumsCheck, "readyToPost: ", readyToPost);

  // runs the check with every new category
  useEffect(() => {
    checkDataComplete(
      expenseCategory,
      userShareArray,
      expTotal,
      currentGroupId
    );
  }, [expenseCategory]);

  // runs the check of sums in response to user interaction
  useEffect(() => {
    checkSums(userShareArray, expTotal);
    //arrangePayments_fn(userShareArray)
  }, [userShareArray]);

  // show modal to confirm creation of the expense
  // not implemented in the end...
  const confirmPost = (readyToPost, sumsCheck) => {
    if (readyToPost && sumsCheck === true) {
      console.log("\n\nI'm inside true in confirm post");
      setModalVisible(true);
      setProceed(true);
    } else {
      setProceed(false);
      setModalVisible(false);
    }
  };

  // post to the endpoint, the moment of truth
  const postExpense = async (expenseObject) => {
    try {
      const response = await axios.post(
        `${Global.server}/expenses/`,
        expenseObject
      );
      if (response.status == 201) {
        console.log("successfully created");
        setUserShareArray([]);
        setProceed(false);
        alert("Done!");
      }
    } catch (error) {
      console.log("\n\n", error);
    }
  };

  //console.log('arrangement of payments outside the fn: ', arrangePayments)
  // creates the array of objects that will be sent in the post call
  //console.log("the title: ", expenseTitle)
  const handlePost = (
    expenseCategory,
    expenseTitle,
    expenseNotes,
    formatedDay,
    userShareArray,
    expTotal,
    currentGroupId
  ) => {
    // builds the object, convert to json and send it with a fetch to the API
    if (expenseCategory) {
      if (
        expenseCategory.property != "Unknown" &&
        userShareArray &&
        expTotal &&
        currentGroupId
      ) {
        let usersArray = [];
        usersArray = userShareArray.map((obj) => {
          return {
            userId: obj.id,
            amountShouldPay: parseFloat(obj.toPay) ? parseFloat(obj.toPay) : 0,
            paid: parseFloat(obj.alreadyPaid) ? parseFloat(obj.alreadyPaid) : 0,
            debt:
              (parseFloat(obj.toPay) ? parseFloat(obj.toPay) : 0) >
              (parseFloat(obj.alreadyPaid) ? parseFloat(obj.alreadyPaid) : 0)
                ? roundTo(
                    Math.abs(
                      (parseFloat(obj.alreadyPaid)
                        ? parseFloat(obj.alreadyPaid)
                        : 0) -
                        (parseFloat(obj.toPay) ? parseFloat(obj.toPay) : 0)
                    ),
                    2
                  )
                : 0,
          };
        });

        const expenseObject = {
          categoryId: expenseCategory._id,
          date: date,
          note: expenseNotes ? expenseNotes : "Super!",
          title: expenseTitle
            ? expenseTitle
            : `Spending on ${expenseCategory.property} ${formatedDay}`,
          expenseTotal: parseFloat(expTotal),
          users: usersArray,
          groupId: currentGroupId,
          payments: [],
          arrangements: arrangePayments_fn(userShareArray),
        };

        console.log("\n\n\nsend to the endpoint", expenseObject);

        postExpense(expenseObject);
      } else {
        //console.log('missing data de handleSubmit', proceed)
      }
    }
  };

  // needed by the FlatList
  const renderItem = ({ item, index }) => (
    <View style={{ padding: 10, marginTop: 5 }}>
      {/*<Text>user id:  {item.id}</Text>*/}
      <RenderComponent
        checkPaid={checkPaid}
        checkShares={checkShares}
        item={item}
        index={index}
        data={userShareArray}
        setData={setUserShareArray}
      />
    </View>
  );

  return (
    <FlatList
      // the header of the FlatList
      ListHeaderComponent={
        <>
          <CustomTopbar
            screenTitle={screenTitle}
            onPressAdd={onPressAdd}
            onPressList={onPressList}
            addDisabled={false}
            listDisabled={false}
            sectionIcon="euro-sign"
            leftIcon="plus"
            rightIcon="list"
          />

          <View style={styles.totalCostContainer}>
            <Text style={styles.categoryTitle}>How much?</Text>
            <TextInput
              name="expenseTotal"
              placeholder="total cost"
              defaultValue=""
              onChangeText={(text) => {
                setExpTotal(text);
              }}
              keyboardType="decimal-pad"
              rules={{
                required: "Total cost must be a valid number",
                pattern: {
                  value: NUMBER_REGEX,
                  message: "Total cost is invalid",
                },
              }}
              style={[styles.totalTextInput, { paddingVertical: 0 }]}
            />
          </View>

          <TouchableOpacity onPress={toggleCategory}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.categoryTitle}>Select a Category</Text>
              <FontAwesome5
                name={
                  !expenseCategory || expenseCategory._id == "Unknown"
                    ? "question"
                    : "check"
                }
                size={Size.ls}
                color={ColorPalette.primarySeance}
                style={{ marginTop: 13, marginLeft: 0 }}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsCategory} align="center">
            <CustomDropdown
              title="Categories"
              listdrop={CategoryList}
              selected={(obj) => setExpenseCategory(obj)}
              onValueChange={(obj) => setExpenseCategory(obj)}
            ></CustomDropdown>
          </Collapsible>

          <TouchableOpacity onPress={toggleTitle}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.categoryTitle}>A name for this expense</Text>
              <FontAwesome5
                name={
                  !expenseCategory || expenseCategory._id == "Unknown"
                    ? "question"
                    : "check"
                }
                size={Size.ls}
                color={ColorPalette.primarySeance}
                style={{ marginTop: 13, marginLeft: 0 }}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsTitle} align="center">
            <TextInput
              name="title"
              defaultValue={
                !expenseCategory || expenseCategory._id == "Unknown"
                  ? "Select a category to fill this automatically"
                  : `Spending on ${expenseCategory.property} ${formatedDay}`
              }
              onChangeText={(text) => setExpenseTitle(text)}
              rules={{
                required: "Title is required",
                pattern: { value: TEXT_REGEX, message: "Title is invalid" },
              }}
              style={styles.totalTextInput}
            />
          </Collapsible>
          <TouchableOpacity onPress={toggleNotes}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.categoryTitle}>Any remarks</Text>
              <FontAwesome5
                name={!expenseNotes ? "question" : "check"}
                size={Size.ls}
                color={ColorPalette.primarySeance}
                style={{ marginTop: 13, marginLeft: 0 }}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsNotes} align="center">
            <TextInput
              name="notes"
              defaultValue={"Super!"}
              onChangeText={(text) => setExpenseNotes(text)}
              style={styles.totalTextInput}
            />
          </Collapsible>
        </>
      }
      // the body of the FlatList
      data={userShareArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      // the footer of the FlatList
      ListFooterComponent={
        <View style={styles.container}>
          <CustomButton
            text="Add"
            type={readyToPost && sumsCheck === true ? "PRIMARY" : "TERTIARY"}
            onPress={() =>
              handlePost(
                expenseCategory,
                expenseTitle,
                expenseNotes,
                formatedDay,
                userShareArray,
                expTotal,
                currentGroupId
              )
            }
          />

          {/*
						readyToPost && sumsCheck  === true ? (
						<CustomModal
							title="All set!"
							message="Let's create this expense"
							logoOrIcon={logoOrIcon}
							onPressfn={confirmPost(readyToPost, sumsCheck)}
							showMe={modalVisible}
						></CustomModal>) : null
					*/}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 42,
    marginTop: 5,
    marginBottom: 0,
  },
  userName: {
    width: "70%",
    fontSize: Size.mm,
    textAlign: "right",
    marginLeft: 5,
    marginBottom: 0,
  },
  categoryTitle: {
    fontSize: Size.mm,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 5,
    color: ColorPalette.primaryBlack,
  },
  totalCostContainer: {
    flexDirection: "row",
    marginTop: 10,
    minWidth: "40%",
  },
  totalTextInput: {
    fontSize: 20,
    borderColor: ColorPalette.primaryGray,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: ColorPalette.primaryWhite,
  },
  otherTextInput: {
    minWidth: "20%",
    height: 40,
    fontSize: 18,
    borderColor: ColorPalette.primaryGray,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: ColorPalette.primaryWhite,
  },
  plainTextInput: {
    minWidth: "20%",
    height: 40,
    fontSize: 18,
    fontWeight: "bold",
    borderColor: ColorPalette.primaryGray,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  paymentConcepts: {
    maxWidth: "70%",
    fontSize: Size.xm,
    textAlign: "right",
    marginBottom: 0,
    marginLeft: 5,
  },
  owe: {
    minWidth: "20%",
    height: 40,
    color: "white",
    fontSize: 22,
    //fontWeight:'bold',
    textAlign: "center",
    borderColor: ColorPalette.primaryRouge,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    paddingVertical: 5,
    backgroundColor: ColorPalette.primaryRouge,
    overflow: "hidden",
  },
  excess: {
    minWidth: "20%",
    height: 40,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderColor: ColorPalette.primaryGreen,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    paddingVertical: 5,
    backgroundColor: ColorPalette.primaryGreen,
    overflow: "hidden",
  },
});

export default ExprensesScreen;
