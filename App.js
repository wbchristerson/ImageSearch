import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import SearchPage from './components/SearchPage'
import DetailPage from './components/DetailPage'
import { StackNavigator } from 'react-navigation'

const MainNavigator = StackNavigator({
  Home: {
    screen: SearchPage,
    navigationOptions: {
      title: "Home",
      headerStyle: {
        backgroundColor: '#42f4ce'
      }
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#4bf442'
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
      reducer,
      composeEnhancers(
        applyMiddleware(thunk)
      )
    )
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <MainNavigator/>
          </View>
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
})
