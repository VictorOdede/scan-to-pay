import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';

export default function SignUp({navigation}) {


    // store user phone number in local storage
    const storeValue = async (value) => {
        try{
            await AsyncStorage.setItem('myNumber', value); 
            console.log(value);
        } catch(err){
            console.log(err);
        }
    }
    


    const goScan = () => {
        storeValue(phone);
        navigation.navigate("ScanQR");
    }

    const [phone, setPhone] = useState('');

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter your M-PESA phone number</Text>
            <TextInput 
                style={styles.textInput}
                keyboardType={'numeric'}
                type='number'
                onChangeText={handlePhoneChange} 
                value={phone.toString()}
                placeholder='Phone Number'
                label='Mpesa Number'
                mode='outlined'/>
            <Button title="OK" onPress={goScan} color='#2EA44F'/>
        </View>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        fontWeight: 'bold',
        justifyContent: 'center',
        marginBottom: 10,
        textAlign: 'center'
    },
    textInput: {
        fontWeight: 'bold',
        textAlign: 'left',
        height: 40,
        // borderRadius: 10,
        // borderWidth: 2,
        // borderColor: '#160153',
        marginBottom: 10
    }
});
