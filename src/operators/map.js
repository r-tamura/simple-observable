import Observable from '../observable'

/**
 * Observableからemitされたデータに変換処理を行う
 * @param {function(value: T)} project - 変換処理
 * @return {Observable}
 */
export function map(project) {
  const outputObservable = Observable.create(observer => {
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

