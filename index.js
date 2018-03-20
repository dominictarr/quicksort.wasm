var fs = require('fs'), path = require('path')
var wasm = fs.readFileSync(path.join(__dirname, './quicksort.wasm'))

//instantiate the module synchronously
//http://devdocs.io/javascript/global_objects/webassembly/module
//
//https://twitter.com/mafintosh/status/875399010521141248
//
//there are infuriating arbitary limits on loading wasm sync
//(that differ between js engines of course) but this module is tiny

var m = WebAssembly.Module(wasm)
var instance = WebAssembly.Instance(m)
//module.exports = instance.exports

var b = new Buffer(instance.exports.memory.buffer)

exports.partition = function (lo, hi, pivot) {
  return instance.exports.partition(lo, hi, pivot)
}

exports.sort = instance.exports.sort

exports.buffer = b

