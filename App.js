import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanQR from './components/ScanQR'
import Amount from './components/Amount';

import Success from './components/Success';


import {registerRootComponent} from 'expo';
import {DataProvider} from './components/DataContext';
import { Camera } from 'expo-camera';








const Stack = createStackNavigator();

// create a wrapper for the entire app
export default function App() {

  const [hasPermission, setHasPermission] = useState(null);

  // check for camera permissions while splash-screen is showing
  useEffect(() => 
    {
      (
        async () => {
          // Request for camera permission after component renders
          const { status } = await Camera.requestCameraPermissionsAsync();
          // If camera permission is granted, hasPermission is set to true
          setHasPermission(status === 'granted');
        })();
    }, []);

        // Before camera permission is granted
    if (hasPermission === null) {
      return null;
    };
  
    // When camera permision is not granted
    if (hasPermission === false) {
      return <Text>Camera permission is required</Text>
    };


  return (
    <DataProvider>

     
          <NavigationContainer >
            <Stack.Navigator
              initialRouteName="ScanQR"
              screenOptions={{ headerTitleAlign: 'center' }}>

              <Stack.Screen
                name="ScanQR"
                component={ScanQR}
                options={{ title: 'Scan a Lipa QR Code' }} />

              <Stack.Screen
                name="Amount"
                component={Amount}
                options={{ title: 'Payment Details' }} />


              <Stack.Screen
                name="Success"
                component={Success}
                options={{ title: 'Enter PIN' }}
                />



            </Stack.Navigator>
          </NavigationContainer>
        
    </DataProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
    height: '100%'
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  }
});

// AppRegistry.registerComponent('ScanQR', () => App);
registerRootComponent(ScanQR);
