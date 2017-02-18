import Observable from '../observable'

/**
 * Observableからemitされたデータにフィルタリング処理を行う
 * @param {function(value: T): boolean} filterFn - フィルタリング処理
 * @return {Observable}
 */
export function filter(filterFn) {
  const outputObservable = Observable.create(observer => {
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

