var quicksort = require('./')
quicksort.grow(500)

for(var N = 1; N <= 10000000; N = Math.ceil(N* 1.5)) {
  var b = new Buffer(N*4)
  var ary = new Int32Array(b.buffer), _ary = []

  for(var i = 0; i < N; i++)
    _ary.push(ary[i] = (Math.random()*(1<<16))|0)

  var start = Date.now()
  _ary.sort(function (a, b) { return a - b })
  var js_time = Date.now() - start

  var start = Date.now()
    b.copy(quicksort.buffer)
    quicksort.sort(0, N*4 - 4)
  var wa_time = Date.now() - start
  console.log(N, js_time, wa_time)
}




