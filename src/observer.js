
const emptyFn = function() {}

export default class Observer {
  constructor({next, error, complete} = {next: emptyFn, error: emptyFn, complete: emptyFn}) {
    this._next = next
    this._error = error
    this._complete = complete
  }

  next(x) {
    this._next(x)
  }

  error(err) {
    this._error(err)
  }

  complete() {
    this._complete()
  }
}
