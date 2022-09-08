import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import FriendsListScreen from "../screens/FriendsListScreen";
import FriendsAddScreen from "../screens/FriendsAddScreen";
import ExpensesScreen from "../screens/ExpensesScreen";
import ExpensesListScreen from "../screens/ExpensesListScreen";
import ExpensesPaymentScreen from "../screens/ExpensesPaymentScreen";
import GroupsListScreen from "../screens/GroupsListScreen";
import GroupsAddScreen from "../screens/GroupsAddScreen";
import GroupsUpdateScreen from "../screens/GroupsUpdateScreen";

const Tab = createBottomTabNavigator();

const Exit = () => {
  return null;
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="SignIn"
          component={SignInScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          name="SignUp"
          component={SignUpScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          name="ConfirmEmail"
          component={ConfirmEmailScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          name="NewPassword"
          component={NewPasswordScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/homeActive.png")
                    : require("../../assets/icons/home.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                }}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/friendsActive.png")
                    : require("../../assets/icons/friends.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                }}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="FriendsAdd"
          component={FriendsAddScreen}
          options={{
            tabBarButton: () => null,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/groupsActive.png")
                    : require("../../assets/icons/groups.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                }}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="GroupsAdd"
          component={GroupsAddScreen}
          options={{
            tabBarButton: () => null,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="GroupsUpdate"
          component={GroupsUpdateScreen}
          options={{
            tabBarButton: () => null,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="ExpensesAdd"
          component={ExpensesScreen}
          options={{
            tabBarButton: () => null,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Expenses"
          component={ExpensesListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/expensesActive.png")
                    : require("../../assets/icons/expenses.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                }}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="ExpensesPayment"
          component={ExpensesPaymentScreen}
          options={{
            tabBarButton: () => null,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Exit"
          component={ExpensesListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/exit.png")
                    : require("../../assets/icons/exit.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 0,
                }}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
