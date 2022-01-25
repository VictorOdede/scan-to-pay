import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// initialize graphql subscription to transaction object

export default function Loading() {
    // call subscription in useEffect
    // when result is returned, render success / failure component

    return (
        <View style={styles.container}>
            <Text style={styles.text}>loading...</Text>
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