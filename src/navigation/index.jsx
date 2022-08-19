import React from "react";
import { Image, StyleSheet } from "react-native";
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
import GroupsScreen from "../screens/GroupsScreen";
import ExpensesScreen from "../screens/ExpensesScreen";
import { ColorPalette, Size } from "../../appStyles";
//import DebtsScreen from "../screens/DebtsScreen";
//import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const Exit = () => {
  return null;
};

const Navigation = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator 
        screenOptions={{ 
          headerShown: false,
          tabBarStyle: styles.navContainer
        }}
      >
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
                style={styles.navBarIcons}
              />
            ),
            tabBarShowLabel: false,
          }}
          style={styles.navContainer}
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
                style={styles.navBarIcons}
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
          component={GroupsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/groupsActive.png")
                    : require("../../assets/icons/groups.png")
                }
                style={styles.navBarIcons}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Expenses"
          component={ExpensesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/expensesActive.png")
                    : require("../../assets/icons/expenses.png")
                }
                style={styles.navBarIcons}
              />
            ),
            tabBarShowLabel: false,
          }}
        /> 
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create ({
  navContainer: {
    backgroundColor: ColorPalette.primaryWhite,
    flex: 1/6,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  navBarIcons: {
    width: 60,
    height: 60,
  },

})
export default Navigation;
