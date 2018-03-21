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

## benchmark

for arrays with less than 1 million items it's significantly
faster to sort with this module.

I'm not sure why it becomes slower after that, maybe some magic
like [cache locality](https://en.wikipedia.org/wiki/Locality_of_reference)?

I also expect that this implementation can be improved
significantly as I havn't particularily tried to optimize it at all.

probably if the call to partition is inlined into sort performance
will improve significantly.

```
N ms_js ms_wa
1 0 0
2 0 0
3 0 0
5 0 0
8 0 0
12 0 0
18 0 0
27 0 0
41 0 0
62 0 0
93 0 0
140 0 0
210 1 0
315 0 0
473 2 0
710 1 0
1065 2 0
1598 3 1
2397 5 0
3596 3 0
5394 8 0
8091 2 1
12137 4 1
18206 6 3
27309 10 3
40964 15 5
61446 55 8
92169 39 13
138254 55 20
207381 100 30
311072 125 47
466608 188 74
699912 279 116
1049868 414 188
1574802 624 315
2362203 911 548
3543305 1460 976
5314958 2084 1850
7972437 3071 4072
```

## License

MIT

