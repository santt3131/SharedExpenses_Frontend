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
import DebtsScreen from "../screens/DebtsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { ColorPalette, Size } from "../../appStyles";

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
                    ? require("../../assets/icons/home.png")
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
                    ? require("../../assets/icons/friends.png")
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
          component={GroupsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/groups.png")
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
          name="Expenses"
          component={ExpensesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/expenses.png")
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
          name="Debts"
          component={DebtsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/debts.png")
                    : require("../../assets/icons/debts.png")
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
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../../assets/icons/settings.png")
                    : require("../../assets/icons/settings.png")
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
          name="Exit"
          component={Exit}
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

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#efe8dc61",
    flex: 1 / 7,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    borderTopColor: ColorPalette.primaryWhite,
  },
  navBarIcons: {
    width: 55,
    height: 55,
  },
});
export default Navigation;
