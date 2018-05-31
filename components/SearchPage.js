import React, { Component } from 'react'
import SearchField from './SearchField'
import ErrorMessage from './ErrorMessage'
import Results from './Results'
import { connect } from 'react-redux'
import { View, Dimensions, Text } from 'react-native'
import { setDimensions } from '../actions/index'
import { AppLoading } from 'expo'

class SearchPage extends Component {
  updateDimensions = () => {
    const {height, width} = Dimensions.get('window')
    this.props.dispatch(setDimensions(width, height))
  }

  componentDidMount() {
    this.updateDimensions()
    Dimensions.addEventListener("change", this.updateDimensions);
  }

  // stop updating state after unmount
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateDimensions);
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <SearchField listRef={this.refs.listRef}/>
        {!this.props.ready && <AppLoading/>}
        {this.props.querySuccess && this.props.ready && <Results objRef={this}/>}
        {!this.props.querySuccess && <ErrorMessage/>}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    querySuccess: state.querySuccess,
    ready: state.ready,
  }
}

export default connect(mapStateToProps)(SearchPage)
