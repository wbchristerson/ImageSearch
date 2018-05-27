import { GO_TO_IMAGE, GET_IMAGE_LIST } from '../actions'

const initialState = {
  imageId: -1,
}

function screenResult (state = initialState, action) {
  switch (action.type) {
    case GO_TO_IMAGE:
      return {
        ...state,
        ...action.clickedImage,
      }
    case GET_IMAGE_LIST:
      console.log(action.data)
      return {
        ...state,
      }
    default:
      return state
  }
}

export default screenResult
