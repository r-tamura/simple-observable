import polyfill from 'babel-polyfill'
import Observable from './observable'

// const source =
//   Observable.from([10, 20, 30, 40, 50, 60, 70])
//     .map(x => x / 10)
//     .filter(x => x % 2)
//     .reduce((acc, v) => acc + v, 0)

const source =
  Observable.create(observer => {
    const count = 0
    function* generator(limit) {
      for (let i=0; i < limit; i++) {
        yield i * 10
      }
    }
    const gn = generator(10)
    process.nextTick(function emit() {
      const res = gn.next()
      if (!res.done) {
        observer.next(res.value)
        setTimeout(emit, 200)
      } else {
        observer.complete()
      }
    })
  })
    .map(x => x / 10)
    .filter(x => x % 2)

source
  .subscribe(
    x => console.log(x),
    err => console.error(err),
    () => console.log('done')
  )
