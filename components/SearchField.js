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
    // this.props.dispatch(getResults('yellow flowers'))
  }

  render() {
    let input = this.state.input
    return(
      <KeyboardAvoidingView behavior='padding'>
        <Text>This is a test.</Text>
        <TextInput
          value={input}
          onChangeText={this.handleTextChange}
          placeholder='Search Term'
          placeholderTextColor='#3E5982'/>
        <TouchableOpacity onPress={this.submit}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps (state) {
  return {
    imageId: state.imageId
  }
}

export default connect(mapStateToProps)(SearchField)
