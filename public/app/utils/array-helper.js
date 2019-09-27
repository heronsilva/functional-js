if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function (callback) {
    return this
      .map(callback)
      .reduce((destArr, arr) => destArr.concat(arr), [])
  }
}
