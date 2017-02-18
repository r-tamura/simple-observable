import Observer from './observer'

function toObserver(observerOrNext, error, complete) {

  if(arguments.length === 0) {
    return new Observer()
  }

  if(typeof observerOrNext === 'object') {
    return new Observer(observerOrNext)
  }

  return new Observer({next: observerOrNext, error, complete})
}

/**
 * Observable Class
 */
export default class Observable {

  /**
   * @constructor
   * @param {function(observer: {next: function, error: function, complete: function})} subscribe - subscribeされたときに実行される関数
   */
  constructor(subscribe) {
    this._subscribe = subscribe
  }

  /**
   *  任意のロジックでデータをObservableを生成する
   *  @param {function(observer: Observer)} subscribe - subscribeされたときに実行される関数
   *  @return {Observable} a new cold observable
   */
  static create(subscribe) {
    return new Observable(subscribe)
  }

  /**
   * Array, Array-likeオブジェクトからObservableを生成する
   * @param {Array<T>} iterable - Array, Array-likeオブジェクト
   * @return {Observable} a new cold observable
   */
  static from(iterable) {
    return new Observable(observer => {
      [...iterable].forEach(i => observer.next(i))
      observer.complete()
    })
  }

  /**
   * Observableから受け取ったemit data, error, completeのハンドリング処理を登録する
   * @method subscribe
   * @param {Observer|function(value: T): void} observerOrNext (optional) Observableオブジェクト or データemit時に実行されるハンドラ
   * @param {function(err: any): void} error (optional) エラーemit時に実行されるハンドラ
   * @param {function(): void} complete (optional) complete時に実行されるハンドラ
   */
  subscribe(observerOrNext, error, complete) {
    const observer = toObserver(observerOrNext, error, complete)
    this._subscribe(observer)
  }
}

// Operatorをprototypeへ追加
require('./add/map')
require('./add/filter')
require('./add/reduce')


