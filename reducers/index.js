import { GO_TO_IMAGE } from '../actions'

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
    default:
      return state
  }
}

export default screenResult
