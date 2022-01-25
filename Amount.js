import React, {useState, useContext} from 'react';
import { StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {DataContext} from './DataContext';

export default function Amount ({navigation}) {
    const value = useContext(DataContext);

    // add new amount to state

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const pressOk = () => {
        navigation.navigate('Confirm');
    }
    let amount = 0;

    return(
        <View style={styles.container}>
            <Text style={styles.text}>ENTER AMOUNT</Text>

            <TextInput 
                style={styles.textInput}
                keyboardType={'numeric'}
                type='number'
                placeHolder='Enter Amount' 
                onChange={handleAmountChange} 
                defaultValue={amount}/>

            <Button title="OK" onPress={pressOk} color='#2EA44F'/>
                
            

        </View>
    )
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
        textAlign: 'center',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#160153',
        marginBottom: 10
    }
});
