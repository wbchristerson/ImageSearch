import { GO_TO_IMAGE, GET_IMAGE_LIST, SHOW_RESULTS } from '../actions'

const initialState = {
  imageId: -1,
  showingResults: false,
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
    case SHOW_RESULTS:
      return {
        ...state,
        showingResults: action.status
      }
    default:
      return state
  }
}

export default screenResult
