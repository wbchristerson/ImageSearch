import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import SearchField from './components/SearchField'

export default class App extends React.Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
      reducer,
      composeEnhancers(
        applyMiddleware(thunk)
      )
    )

    // <Provider store={createStore(reducer)}>
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <SearchField/>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
