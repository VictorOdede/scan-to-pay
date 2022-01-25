import 'react-native-gesture-handler';
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amount from './Amount';
import Confirm from './Confirm';
import Success from './Success';
import FailedTransaction from './FailedTransaction';
import Loading from './Loading';
import SignUp from './SignUp';
import {DataProvider, DataContext} from './DataContext';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery} from '@apollo/client';
import { Provider as PaperProvider } from 'react-native-paper';

// Initialize apollo client
// const client = new ApolloClient({
//   uri: 'http://134.209.145.73/v1/graphql',
//   cache: new InMemoryCache()
// });

// var matatuId = 2;
// //Query for matatu details
// const GET_MATATU = gql`
//   query getMatatu(id=${matatuId}){
//     user{
//       id
//       sacco_name
//       registration_plate
//     }
//   }
// `


// QR Scanner component
function ScanQR({navigation}) {
  //Set state for the url scanned in QR Code
  //const [newUrl, setNewUrl] = useContext(DataContext);
  // Set state permission status for using camera
  const [hasPermission, setHasPermission] = useState(null);
  // State of the current scan
  const [scanned, setScanned] = useState(false);

  // Fetch Matatu details from graphql
  // const {data, loading, error} = useQuery(GET_MATATU);  
  
  // if (loading) console.log('loading..');
  // if (error) console.log(`Error: ${error.message}`);

  // const matatu_sacco = data.user.sacco_name;
  // const matatu_plate = data.user.registration_plate; 

  // add matatu registration plate to state

  // add sacco name to state


  useEffect( () => {(
    async () => { 
      // Request for camera permission after component renders
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // If camera permission is granted, hasPermission is set to true
      setHasPermission(status === 'granted');
    })();

    return () => {setScanned(false)};
      
  }, []);

  
  // Do something after QR is scanned
  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    console.log(data);
    navigation.navigate("Amount");
  };
  
  // Before camera permission is granted
  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>
  };

  // When camera permision is not granted
  if (hasPermission === false) {
    return <Text>Camera permission is required</Text>
  };

  


  return (
    <View style={styles.container}>

      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}>
        <BarcodeMask edgeColor= '#2EA44F' edgeRadius = {0} lineAnimationDuration = {3000} />

      </BarCodeScanner>
     
    </View>
  );
}


const Stack = createStackNavigator();

// create a wrapper for the entire app
export default function App() {
  return (
    <DataProvider>
      {/* <ApolloProvider client={client}> */}
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="SignUp"
              screenOptions={{ headerTitleAlign: 'center' }}>

              <Stack.Screen 
                name="ScanQR" 
                component={ScanQR}
                options={{title: 'Scan QR Code'}} />

              <Stack.Screen 
                name="Amount"
                component={Amount}
                options={{title: 'Enter Amount'}} />

              <Stack.Screen 
                name="Confirm"
                component={Confirm} />

              <Stack.Screen 
                name="Success"
                component={Success} />

              <Stack.Screen 
                name="Failed"
                component={FailedTransaction} />

              <Stack.Screen 
                name="Loading"
                component={Loading} />

              <Stack.Screen 
                name="SignUp"
                component={SignUp} />


            </Stack.Navigator>

          </NavigationContainer>
        </PaperProvider>
      {/* </ApolloProvider> */}
    </DataProvider>
  );
}


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

AppRegistry.registerComponent('MyApplication', () => App);
