// Given an entry of the resulting query, format the relevant information into
// a single object
export function scrapeData(obj) {
  return {
    comments: obj.comments,
    previewHeight: obj.previewHeight,
    previewWidth: obj.previewWidth,
    previewURL: obj.previewURL,
    user: obj.user,
  }
}
