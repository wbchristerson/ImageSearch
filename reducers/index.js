import { GO_TO_IMAGE, GET_IMAGE_LIST, SHOW_RESULTS, SET_QUERY } from '../actions'
import { scrapeData } from '../utils/helper'

const initialState = {
  imageId: -1,
  showingResults: false,
  resultList: [],
  currentQuery: '',
}

function screenResult (state = initialState, action) {
  switch (action.type) {
    case GO_TO_IMAGE:
      return {
        ...state,
        ...action.clickedImage,
      }
    case GET_IMAGE_LIST:
      console.log('Action Data: ', action.data)
      newResultList = []
      console.log('Action Data Hits: ', action.data.hits)
      for (let i = 0; i < action.data.hits.length; i++) {
        newResultList.push(scrapeData(action.data.hits[i]))
        console.log("Object: ", action.data.hits[i])
        console.log(scrapeData(action.data.hits[i]))
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
    case SET_QUERY:
      return {
        ...state,
        currentQuery: action.query,
      }
    default:
      return state
  }
}

export default screenResult
