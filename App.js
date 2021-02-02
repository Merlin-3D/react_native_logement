import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './Navigation/TabNavigation';
import { StatusBar } from 'expo-status-bar';
import Logement from './Screen/Logement';
import Locataires from './Screen/Locataires';
import Locations from './Screen/Locations';
import Detail from './Screen/Detail'
import { Provider }from "react-redux"
import store from './redux/store'
import Contact from './Screen/contact';


const Stack = createStackNavigator();
export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style={"light"} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TabNavigation">
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{
                title: "Bail 3D",
                headerStyle: {
                  backgroundColor: "#2980b9",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Logement"
              component={Logement}
              options={{
                title: "Créer un nouveau bien",
                headerStyle: {
                  backgroundColor: "#2980b9",
                  shadowOpacity: 0,
                  elevation: 0,
                },

                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Locataire"
              component={Locataires}
              options={{
                title: "Informations Locataires",
                headerStyle: {
                  backgroundColor: "#2980b9",
                  shadowOpacity: 0,
                  elevation: 0,
                },

                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Locations"
              component={Locations}
              options={{
                title: "Informations Locations",
                headerStyle: {
                  backgroundColor: "#2980b9",
                  shadowOpacity: 0,
                  elevation: 0,
                },

                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Details"
              component={Detail}
              options={{
                title: "Détails location",
                headerStyle: {
                  backgroundColor: "#2980b9",
                  shadowOpacity: 0,
                  elevation: 0,
                },

                headerTintColor: "#fff",
              }}
            />
           
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
/**<Stack.Screen
              name="contacts"
              component={Contact}
              options={{
                title: "List contact",
                headerStyle: {
                  backgroundColor: "#2980b9",
                  shadowOpacity: 0,
                  elevation: 0,
                },

                headerTintColor: "#fff",
              }}
            /> */

