import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { goToImage, getResults, showResults, setQuery } from '../actions'

class SearchField extends Component {
  state = {
    input: '',
  }

  handleTextChange = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  submit = () => {
    const query = encodeURIComponent(this.state.input)
    this.props.dispatch(setQuery(this.state.input))
    this.props.dispatch(showResults(true))
    this.props.dispatch(getResults(query))
  }

  // if in portrait mode, make selection field span most of screen; if in landscape
  // mode, make selection field span 80% of screen width
  fieldWidthRatio = () => {
    return this.props.screenWidth <= this.props.screenHeight ? 1.0 : 0.8
  }

  // if in portrait mode, make button width span 20% of screen width; if in
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
      <KeyboardAvoidingView behavior='padding' style={{marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 4, flexDirection: 'row', maxWidth: componentWidth - 20, flexWrap: 'wrap', justifyContent: 'center'}}>
        <TextInput
          style={{paddingLeft: 10, paddingRight: 10, height: 40, fontSize: 24, width: fieldWidth}}
          value={input}
          onChangeText={this.handleTextChange}
          placeholder='Search Term'
          placeholderTextColor='#3E5982'/>
        <TouchableOpacity style={{ width: buttonWidth, backgroundColor: '#e80d0d', padding: 10, alignItems: 'center', borderRadius: 2 }} onPress={this.submit}>
          <Text style={{ color: 'white' }}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps (state) {
  return {
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    // imageId: state.imageId

  }
}

export default connect(mapStateToProps)(SearchField)
