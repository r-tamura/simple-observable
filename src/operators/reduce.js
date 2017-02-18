import Observable from '../observable'

/**
 * Observableからemitされたデータを結合処理(accumlator)ににもとづきデータを蓄積する
 * @param {function(acc: R, x: T): R} accumlator - 結合処理を行う関数
 * @param {R} seed - reduceの初期値
 * @return {Observable}
 */
export function reduce(accumlator, seed) {
  // reduceの初期値
  let acc = seed
  const outputObservable = Observable.create(observer => {
    this.subscribe({
      next: x => {
        acc = accumlator(acc, x)
      },
      error: err => observer.error(err),
      complete: () => {
        observer.next(acc)
        observer.complete()
      }
    })
  })
  return outputObservable
}

