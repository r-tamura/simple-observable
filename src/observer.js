
const emptyFn = function() {}

/**
 * Observableから提供されるpush-baseの通知を処理するインタフェースクラス
 */
export default class Observer {

  /**
   * @constructor
   * @param {{next: function((x: T): void, error: function(err: any): void, complete: function(): void}} observerinput - Observerが必要とするハンドリング処理
   */
  constructor({next, error, complete} = {next: emptyFn, error: emptyFn, complete: emptyFn}) {
    this._next = next
    this._error = error
    this._complete = complete
  }

  /**
   * ObservableからNextが通知された場合に実行されるCallback
   * @param {T} value - Observableから提供される値
   */
  next(value) {
    this._next(value)
  }

  /**
   * ObservableからErrorが通知された場合に実行されるCallback
   * @param {any} err - Observableから提供される値
   */
  error(err) {
    this._error(err)
  }

  /**
   * ObservableからCompleteが通知された場合に実行されるCallback
   */
  complete() {
    this._complete()
  }
}
