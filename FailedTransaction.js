import react, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function FailedTransaction({navigation}) {
    
    const tryAgain = () => {
        navigation.navigate("ScanQR")
    }
    
    return (

        <View style={styles.container}>
            <Text style={styles.text}>Transaction failed</Text>
            <Button title="OK" onPress={tryAgain} color='#2EA44F'/>
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
        textAlign: 'center',
        padding: 10
    }
});