import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from '../Screen/Home';
import Locataires from '../Screen/Locataires';
import Parametres from '../Screen/Parametres';
import Locations from '../Screen/Locations';
import ListLocataire from '../Screen/ListLocataire';


const Tab = createBottomTabNavigator();

const TabNavigation =props=> {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home";
          } else if (route.name === "Locataires") {
            iconName = focused ? "ios-people" : "ios-people";
          } else if (route.name === "Location") {
            iconName = focused ? "ios-key" : "ios-key";
          } else if (route.name === "Planing") {
            iconName = focused ? "md-calendar" : "md-calendar";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#2980b9",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Locataires" component={ListLocataire} />
      <Tab.Screen name="Planing" component={Parametres} />
    </Tab.Navigator>
  );
}

export default TabNavigation;
