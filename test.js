
var tape = require('tape')
var quicksort = require('./')

var b = quicksort.buffer
b.writeUInt32LE(5, 0)
b.writeUInt32LE(2, 1*4)
b.writeUInt32LE(1, 2*4)
b.writeUInt32LE(3, 3*4)
b.writeUInt32LE(4, 4*4)

console.log(quicksort.buffer.slice(0, 5*4))
console.log(quicksort.partition(0, 4*4, 3))
console.log(quicksort.buffer.slice(0, 10*4))

