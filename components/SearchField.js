import React, { Component } from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { goToImage, getResults } from '../actions'

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
    console.log('Hello\n\n')
    this.props.dispatch(getResults('yellow flowers'))
  }

  render() {
    let input = this.state.input
    return(
      <KeyboardAvoidingView behavior='padding'>
        <Text>This is a test.</Text>
        <TextInput
          value={input}
          onChangeText={this.handleTextChange}
          placeholder='Deck Title'
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
