import Observer from './observer'
import Observable from './observable'

const source =
  Observable.from([10, 20, 30, 40, 50, 60, 70])
    .map(x => x / 10)
    .filter(x => x % 2)
    .reduce((acc, v) => acc + v, 0)

source
  .subscribe(new Observer({
    next: x => console.log(x),
    error: err => console.error(err),
    complete: () => console.log('done')
  }))
