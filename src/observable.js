export default class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe
  }

  static create(subscribe) {
    return new Observable(subscribe)
  }

  static from(iterable) {
    return new Observable(observer => {
      [...iterable].forEach(i => observer.next(i))
      observer.complete()
    })
  }

  subscribe(observer) {
    this._subscribe(observer)
  }
}

// Operatorをprototypeへ追加
[
  './operators/map',
  './operators/filter',
  './operators/reduce',
]
.forEach(op => require(op).default(Observable))

