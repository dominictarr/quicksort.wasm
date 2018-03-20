
var tape = require('tape')
var quicksort = require('./')

function UInt32LEArray (ary, b) {
  b = b || new Buffer(ary.length*4)
  for(var i = 0; i < ary.length; i++)
    b.writeUInt32LE(ary[i], i*4)
  return b
}

function fromUInt32LEArray (b) {
  var a = []
  for(var i = 0; i < b.length; i +=4)
    a.push(b.readUInt32LE(i))
  return a
}


var b = quicksort.buffer

var l = UInt32LEArray([5,2,1,3,4], b)

tape('partition', function (t) {
  console.log(quicksort.buffer.slice(0, 5*4))
  console.log(quicksort.partition(0, 5*4-4, 3))
  t.deepEqual(quicksort.buffer.slice(0, 5*4), UInt32LEArray([1,2,3,5,4]))
  console.log(quicksort.buffer.slice(0, 10*4))
  console.log(quicksort.partition(12, 16, 4))
  t.deepEqual(quicksort.buffer.slice(0, 5*4), UInt32LEArray([1,2,3,4,5]))
  console.log(quicksort.partition(0, 8, 2))
  t.deepEqual(quicksort.buffer.slice(0, 5*4), UInt32LEArray([1,2,3,4,5]))

  t.end()
})

tape('partition2', function (t) {
  var l = UInt32LEArray([5,3,1,2,4], b)
  console.log(quicksort.partition(0, 16, 5))

  t.end()
})

tape('partition', function (t) {
  var l = UInt32LEArray([5,3,7,2,4], b)
  console.log(quicksort.partition(0, 5*4-4, b.readUInt32LE(16/2)))
  console.log(quicksort.partition(0, 5*4-4, b.readUInt32LE(8/2)))
  console.log(quicksort.buffer.slice(0, 5*4))
  t.end()
})


tape('partition, no loop', function (t) {
  var l = UInt32LEArray([1,1], b)
  console.log(quicksort.partition(0, 4, 1))
//  t.deepEqual(quicksort.buffer.slice(0, 8), ))
  t.end()
})


function cmp (a, b) {
  return a - b
}
function testSort (ary) {
  tape('sort:'+JSON.stringify(ary), function (t) {
    UInt32LEArray(ary, b)
    console.log(quicksort.sort(0, ary.length*4 - 4))
    var _buffer = quicksort.buffer.slice(0, ary.length*4)
    t.deepEqual(_buffer, UInt32LEArray(ary.slice().sort(cmp)))
    console.log(fromUInt32LEArray(_buffer))
    t.end()
  })
}

tape('sort', function (t) {
  var l = UInt32LEArray([5,3,7,2,4], b)
  console.log(quicksort.sort(0, 5*4-4))
  console.log(quicksort.buffer.slice(0, 5*4))
  t.end()
})

tape('sort', function (t) {
  var _b = require('crypto').randomBytes(32)
  //var l = UInt32LEArray([5,3,7,2,4], b)
  _b.copy(quicksort.buffer)
  console.log(quicksort.sort(0, 32-4))
  console.log(fromUInt32LEArray(quicksort.buffer.slice(0, 32)))
  t.end()
})

testSort([1,2,3,4,5])
testSort([5,4,3,2,1])
testSort([10, 2, 100])
testSort([1])
testSort([1,1,1])
testSort([1,2, 1])


