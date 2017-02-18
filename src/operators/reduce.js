import Observable, { Observer } from '../observable'

export default function (Observable) {
  Observable.prototype.reduce = function reduce(accumlator, seed) {
    // reduceの初期値
    let acc = seed
    const outputObservable = new Observable(observer => {
      this.subscribe(new Observer({
        next: x => {
          acc = accumlator(acc, x)
        },
        error: err => observer.error(err),
        complete: () => {
          observer.next(acc)
          observer.complete()
        }
      }))
    })
    return outputObservable
  }
}
