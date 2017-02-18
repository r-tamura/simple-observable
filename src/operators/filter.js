import Observable, { Observer } from '../observable'

export default function (Observable) {
  Observable.prototype.filter = function filter(filterFn) {
    const outputObservable = new Observable(observer => {
      this.subscribe({
        next: x => {
          if(filterFn(x)) {
            observer.next(x)
          }
        },
        error: err => observer.error(err),
        complete: () => observer.complete()
      })
    })
    return outputObservable
  }
}
