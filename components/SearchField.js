import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ToastAndroid,
  StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { goToImage, getResults, setQuery,
  setReady } from '../actions/index'

class SearchField extends Component {
  state = {
    input: '',
  }

  handleTextChange = (newInput) => {
    const encodedQuery = encodeURIComponent(newInput)
    if (encodedQuery.length <= 100) {
      this.setState({
        input: newInput
      })
    } else {
      // warn user about search query length limit
      ToastAndroid.show(
        "Search Term's URL Encoding Must Not Exceed A Length Of 100",
        ToastAndroid.SHORT)
    }
  }

  submit = () => {
    const query = encodeURIComponent(this.state.input)
    if (this.props.listRef) {
      this.props.listRef.scrollToOffset({x: 0, y: 0, animated: true})
    }
    this.props.dispatch(setReady(false))
    this.props.dispatch(setQuery(this.state.input))
    this.props.dispatch(getResults(query))
  }

  // if in portrait mode, make selection field span most of screen; if in
  // landscape mode, make selection field span 80% of screen width
  fieldWidthRatio = () => {
    return this.props.screenWidth <= this.props.screenHeight ? 1.0 : 0.8
  }

  // if in portrait mode, make button width span 30% of screen width; if in
  // landscape mode, make button width span 15% of screen width
  buttonWidthRatio = () => {
    return this.props.screenWidth <= this.props.screenHeight ? 0.3 : 0.15
  }

  render() {
    let input = this.state.input
    const componentWidth = this.props.screenWidth
    const fieldWidth = (componentWidth - 20) * this.fieldWidthRatio()
    const buttonWidth = (componentWidth - 20) * this.buttonWidthRatio()
    return(
      <KeyboardAvoidingView behavior='padding' style={[ styles.fieldView,
        { maxWidth: componentWidth - 20 }]}>
        <TextInput
          style={[styles.inputDimensions, { width: fieldWidth }]}
          value={input}
          onChangeText={this.handleTextChange}
          placeholder='Search Term'
          placeholderTextColor='#3E5982'/>
        <TouchableOpacity style={[ styles.buttonInfo, { width: buttonWidth }]}
          onPress={this.submit}>
          <Text style={{ color: 'white' }}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  fieldView: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inputDimensions: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    fontSize: 24,
  },
  buttonInfo: {
    backgroundColor: '#e80d0d',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2,
  }
})

function mapStateToProps (state) {
  return {
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
  }
}

export default connect(mapStateToProps)(SearchField)
