import 'react-native-gesture-handler';
import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, View, Vibration, Button } from 'react-native';
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

const {mpesaNumber, businessQR } = useContext(DataContext);

const [phone, setPhone] = mpesaNumber;
const [businessURL, setBusiness] = businessQR;

  
// State of the current scan
const [scanned, setScanned] = useState(false);

const [torchState, setTorch] = useState("off");

const onSwitch = () => {
  if (torchState == "off"){
    setTorch("torch")} else{
      setTorch("off")
    }
  
}

// Call hook for checking internet connection
const netInfo = useNetInfo();

// hook for re-rendering the screen when in focus
const isFocused = useIsFocused();


// Do something after QR is scanned
const handleBarCodeScanned = async ({ data }) => {

  const myData = data.toString();
  
  const validation_str = myData.slice(0,25);




  if(validation_str !== "https://www.easylipa.xyz/"){
    navigation.navigate("FailedScan")
  } 
  else if(!netInfo.isConnected){
    navigation.navigate("NoInternet")
  } 
  else{
  // setID(business_id);
  console.log(myData)
  setBusiness(myData);

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
          flashMode={torchState}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}>
          <BarcodeMask edgeColor='#FFFFFF' lineAnimationDuration={3000} edgeRadius={15} edgeBorderWidth={8} edgeWidth={40} edgeHeight={40} 
            outerMaskOpacity={0.6}
          />
        </Camera> }
        {/* <Button
          onPress={onSwitch}
          title="torch"
        /> */}

        
  
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