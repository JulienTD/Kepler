import React, { createContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Provider from './src/Provider';
import Display from './src/Display';
import Store from './src/store';

export const Modules = {
  providers: {
    Store
  }
}

export default function App() {
  return (
    <Provider {...Modules.providers}>
      <Display></Display>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
