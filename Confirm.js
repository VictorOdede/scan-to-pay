import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';

// initialize graphql mutation to transaction object

export default function Confirm({navigation}) {

    // call muatation when button is clicked

    

    const confirmed = () => {
        navigation.navigate("Success");
    }

    // get amount and matatu details from state and display to user for confirmation

    return(
        <View style={styles.container}>
            <Text style={styles.text} >Send KSH.50 to ABC SACCO: KAW 223P </Text>
            <Button title="OK" onPress={confirmed} color='#2EA44F'/>
        </View>
    )
};

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

