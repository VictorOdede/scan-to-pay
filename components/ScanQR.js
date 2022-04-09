import 'react-native-gesture-handler';
import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, View, Alert, Vibration } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from './DataContext';
import { Camera } from 'expo-camera';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';


// QR Scanner component
function ScanQR({ navigation }) {

  const readNumber = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
        
    } catch (err) {
        console.log(error)
    }
}

const myKey = '@PHONE_NUMBER';

const {mpesaNumber, scannedID, businessName } = useContext(DataContext);

const [phone, setPhone] = mpesaNumber;
const [ID, setID] = scannedID;
const [business, setBusiness] = businessName;

  
// State of the current scan
const [scanned, setScanned] = useState(false);

// Call hook for checking internet connection
const netInfo = useNetInfo();

// hook for re-rendering the screen when in focus
const isFocused = useIsFocused();


// Do something after QR is scanned
const handleBarCodeScanned = async ({ data }) => {
  setScanned(true);
  const myData = data.toString();
  const business_name = myData.slice(40);
  const business_id = myData.slice(3,39);
  const validation_str = myData.slice(0,2);



  if(validation_str !== "LP"){
    Alert.alert(
      "Failed Scan",
      "Please scan a Lipa QR code.",
      [{text: "OK", onPress: ()=>{ 
        setScanned(false)}}],
      {cancelable: true, onDismiss: () => {setScanned(false)}}
    )
  } else if(!netInfo.isConnected){
    Alert.alert(
      "No internet connection",
      "Please connect to the internet and retry.",
      [{text: "OK", onPress: ()=>{setScanned(false)}}],
      {cancelable: true, onDismiss: () => {setScanned(false)}}
    )
  } else{
  setID(business_id);
  setBusiness(business_name);


  const p = await readNumber(myKey);
  setPhone(p);
  Vibration.vibrate(500); 
  navigation.navigate("Amount");
  setScanned(true);
  } 
};

useFocusEffect(useCallback(()=>{setScanned(false)},
[scanned]))



    
    
    return (
      <View style={styles.container} >
        {isFocused && 
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}>
          <BarcodeMask edgeColor='#FFFFFF' lineAnimationDuration={3000} edgeRadius={15} edgeBorderWidth={8} edgeWidth={40} edgeHeight={40} 
            outerMaskOpacity={0.6}
          />
        </Camera> }
        
  
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch'
 
    },
    scanner: {  
      ...StyleSheet.absoluteFill,
      flex: 1
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 5,
    }
  });

  export default ScanQR;