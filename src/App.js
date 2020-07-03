import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';

import Form from './Form';
import Results from './Results';

/**
 * @function App
 * @description Main application component
 * @return {object} JSX
 */
function App () {
  return (
    <Provider store={ createStore(reducer) }>
      <View style={styles.body}>
        <StatusBar backgroundColor="#234" />
        <Form />
        <Results />
      </View>
    </Provider>
  );
}

/**
 * @constant {object} styles
 * @description Stylesheet
 */
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#def',
    height: '100%',
    width: '100%',
  }
});

export default App;
