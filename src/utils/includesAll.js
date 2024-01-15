const includesAll = function (...strings) {
  return strings.every(string => this.includes(string))
}

String.prototype.includesAll = includesAll
