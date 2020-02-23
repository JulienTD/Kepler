import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends Component<{}, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Button title="Paramètres" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        margin: 10
    }
});
