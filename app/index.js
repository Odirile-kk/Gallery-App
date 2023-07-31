import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CaptureScreen from './Screens/CaptureScreen';
import GalleryScreen from './Screens/GalleryScreen';
import store from './Redux/store';
import { Provider } from 'react-redux';
import HomeScreen from './Screens/HomeScreen';
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Capture" component={CaptureScreen}
        options={{
        headerShown: false,
          tabBarIcon: () => {
            return (
            <Ionicons size={30} color="#a77d54" name={"camera"} />
            );
          }
        }}
       />
      <Tab.Screen name="Gallery" component={GalleryScreen} 
     
        options={{
          headerStyle: {backgroundColor: '#a77d54'},
          headerTintColor: 'white',
          
          tabBarIcon: () => {
            return(
              <View>
              <Ionicons size={28}  color="#a77d54"name={'images'}/>
              </View>
              
            )
          }
        }}
      />
    </Tab.Navigator>
  );
};


const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <MainNavigator />
      {/* </NavigationContainer> */}
    </Provider>
  );
}

