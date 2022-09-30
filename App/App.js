import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./Components/HomeScreen";
import Statistics from "./Components/Statistics";
import Account from "./Components/Account";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Stats") {
              iconName = focused ? "analytics-outline" : "analytics-sharp";
            } else if (route.name === "Account") {
              iconName = focused ? "person-outline" : "person-sharp";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColot: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={Statistics} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
