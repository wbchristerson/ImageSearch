import { GO_TO_IMAGE, GET_IMAGE_LIST, SHOW_RESULTS } from '../actions'
import { scrapeData } from '../utils/helper'

const initialState = {
  imageId: -1,
  showingResults: false,
  resultList: [],
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
      newResultList = []
      for (let obj in action.data.hits) {
        newResultList.push(scrapeData(obj))
      }
      return {
        ...state,
        resultList: newResultList,
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
