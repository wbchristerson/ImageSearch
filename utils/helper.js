// Given an entry of the resulting query, format the relevant information into
// a single object
export function scrapeData(obj) {
  return {
    comments: obj.comments,
    previewURL: obj.previewURL,
    previewWidth: obj.previewWidth,
    previewHeight: obj.previewHeight,
    webformatURL: obj.webformatURL,
    webformatWidth: obj.webformatWidth,
    webformatHeight: obj.webformatHeight,
    user: obj.user,
    userImageURL: obj.userImageURL,
    tags: obj.tags,
  }
}


// re-calculate length for image based on width
export function scaleLength(oldWidth, oldHeight) {
  return ((300 * oldHeight) / oldWidth)
}
