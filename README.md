# quicksort.wasm

quicksort (signed i32 values only) hand written in wat

## example

``` js
var quicksort = require('quicksort.wasm')

//write Int32LE values to quicksort's buffer

quicksort.buffer.writeUInt32LE(5, 0)
quicksort.buffer.writeUInt32LE(1, 0)
quicksort.buffer.writeUInt32LE(3, 0)

//pass pointers first and last item
quicksort.sort(0, 8)

console.log(quicksort.buffer.slice(0, 12))
```

## License

MIT

