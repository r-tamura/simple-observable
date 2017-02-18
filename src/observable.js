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

  subscribe(observerOrNext, error, complter) {
    const observer = toObserver(observerOrNext, error, complter)
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

