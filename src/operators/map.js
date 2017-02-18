import Observable, { Observer } from '../observable'

export default function (Observable) {
  Observable.prototype.map = function map(project) {
    const outputObservable = new Observable(observer => {
      this.subscribe({
        next: x => {
          observer.next(project(x))
        },
        error: err => observer.error(err),
        complete: () => observer.complete()
      })
    })
    return outputObservable
  }
}
