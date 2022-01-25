import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Success({navigation}) {
    const goHome = () => {
        navigation.navigate("ScanQR")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Transaction Successful</Text>
            <Button title="OK" onPress={goHome} color='#2EA44F'/>
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
        textAlign: 'center',
        padding: 10
    }
});