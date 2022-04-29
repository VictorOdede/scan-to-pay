import React from 'react';
import {StyleSheet, View, Image, Text, Button} from 'react-native';
import sad_face from '../assets/sad-face.png';

export default function FailedScan({navigation}) {
    const goHome = () => {
        navigation.navigate("ScanQR")
    }

    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'center', marginLeft: 100, marginRight: 100}}>
                <Image source={sad_face} style={styles.image}/>
            </View>

            <Text style={styles.text}>
            Failed Scan. Please scan a Lipa QR code.
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