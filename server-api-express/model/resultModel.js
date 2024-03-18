class ResultModel {
  constructor({ data = {}, message, code }) {
    if (data) {
      this.data = data
    }

    if (message) {
      this.message = message
    }

    if (code) {
      this.code = code
    }
  }
}

module.exports = {
  ResultModel
}