import React from 'react';
import {StyleSheet, View, Image, Text, Button} from 'react-native';
import no_connection from '../assets/no-connection.png'

export default function NoInternet({navigation}) {
    const goHome = () => {
        navigation.navigate("ScanQR")
    }

    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'center', marginLeft: 100, marginRight: 100}}>
                <Image source={no_connection} style={styles.image}/>
            </View>

            <Text style={styles.text}>
            No internet connection. Please turn on your 3G/4G/WiFi connection and try again.
            </Text>

            <View style={{marginLeft: 100, marginRight: 100, marginTop: 20}}>
                <Button title="BACK" onPress={goHome} color='#2EA44F'/>               
            </View>
            
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
    image: {
        resizeMode: 'contain',
        height: 200,
        width: 200
      },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        fontSize: 18
        
    }
});