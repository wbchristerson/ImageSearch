import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import SearchPage from './components/SearchPage'

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
          <SearchPage/>
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
