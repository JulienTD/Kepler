import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import Dialog from 'react-native-dialog';
import {AsyncStorage} from 'react-native';

export default class App extends Component<{}, {}> {
  state = {
    dialogVisible: false,
    'host': 'http://10.15.192.136:3000',
    'token': 'qwerty'
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  handleHost = (value : string) => {
    AsyncStorage.setItem('host', value)
    this.setState({'host': value})
  }

  handleToken = (value : string) => {
    AsyncStorage.setItem('token', value)
    this.setState({'token': value})
  }

  handleOK = () => {
    this.setState({ dialogVisible: false });
  }
  postData = async(str) => {
    try {
      let res = await fetch(`${this.state.host}/api/action/${str}`, {
        method: 'POST',
        headers: {
          Authorization: `${this.state.token}`
        },
        body: JSON.stringify({
          str,
        }),
      });
      const rest = await res.text();
      console.log(rest);
    } catch (e) {
      console.error(e);
    }
  }

    render() {
        return (
          <SafeAreaView>
            <View style={styles.container}>
              <Button onPress={this.showDialog} title="Parameters"/>
              <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title>Paramètres</Dialog.Title>
                <Dialog.Input label="Host" onChangeText={(host : string) => this.handleHost(host)}
                ></Dialog.Input>
                <Dialog.Input label="Token" onChangeText={(token: string) => this.handleToken(token)}
                ></Dialog.Input>
                <Dialog.Button label="OK" onPress={this.handleOK} />
              </Dialog.Container>
            </View>
            <View style={styles.buttonForward}>
              <Button title="Forward" onPress={() => this.postData('forward')}></Button>
            </View>
            <View style={styles.buttonBack}>
              <Button title="Back" onPress={() => this.postData('backward')}></Button>
            </View>
            <View style={styles.buttonRight}>
              <Button title="Right" onPress={() => this.postData('right')}></Button>
            </View>
            <View style={styles.buttonLeft}>
              <Button title="Left" onPress={() => this.postData('left')}></Button>
            </View>
            <View style={styles.buttonDance}>
              <Button title="Dance" onPress={() => this.postData('dance')}></Button>
            </View>
            <View style={styles.buttonSing}>
              <Button title="Sing" onPress={() => this.postData('sing')}></Button>
            </View>

          </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      right: 10,
      top: 60
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        margin: 10
    },
    buttonForward: {
      width: '30%',
      position: 'absolute',
      right: 125,
      top: 500
    },
    buttonBack: {
      width: '30%',
      position: 'absolute',
      right: 125,
      top: 600
    },
    buttonRight: {
      width: '30%',
      position: 'absolute',
      right: 20,
      top: 550
    },
    buttonLeft: {
      width: '30%',
      position: 'absolute',
      right: 230,
      top: 550
    },
    buttonDance: {
      width: '30%',
      position: 'absolute',
      right: 125,
      top: 300
    },
    buttonSing: {
      width: '30%',
      position: 'absolute',
      right: 125,
      top: 200
    }
});