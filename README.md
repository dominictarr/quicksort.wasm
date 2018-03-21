# quicksort.wasm

quicksort (signed i32 values only) hand-written in wat

## example

``` js
var quicksort = require('quicksort.wasm')

//write Int32LE values to quicksort's buffer

quicksort.buffer.writeUInt32LE(5, 0)
quicksort.buffer.writeUInt32LE(1, 0)
quicksort.buffer.writeUInt32LE(3, 0)

//pass pointers first and last item
quicksort.sort(0, 8)

var b = quicksort.buffer.slice(0, 12)
//values are stored LITTLE ENDIAN, use Int32Array to see as human readable numbers
console.log(new Int32Array(b.buffer, 0, b.length/4))
```

## License

MIT







