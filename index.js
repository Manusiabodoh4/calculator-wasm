const fs = require('fs');

require('./wasm_exec_tiny');

const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
  let response = undefined;  
  const fetchAndInstantiateTask = async () => {          
    return WebAssembly.instantiate(fs.readFileSync(wasmModuleUrl), importObject);
  };
  response = await fetchAndInstantiateTask();
  return response;
};

let arr = []

const add = (x, y) => {
  return x+y;
}

const multi = (x, y) => {
  return x*y
}

(async()=>{
  const go = new Go();
  const importObject = go.importObject;
  
  const wasmModule = await wasmBrowserInstantiate("./go/calculator.wasm", importObject);
  // Allow the wasm_exec go instance, bootstrap and execute our wasm module
  
  go.run(wasmModule.instance);
  // Call the Add function export from wasm, save the result
  let start, end = 0;

  let res = 0

  start = performance.now();  
  res = wasmModule.instance.exports.add(24,24)
  end = performance.now()
  console.log(res)
  console.log(end-start) 
  
  start, end = 0

  start = performance.now();  
  res = add(24,24)
  end = performance.now()
  console.log(res)
  console.log(end-start)  

  start, end = 0

  start = performance.now();  
  res = wasmModule.instance.exports.multi(24,24)
  end = performance.now()
  console.log(res)
  console.log(end-start)  

  start, end = 0

  start = performance.now();  
  res = multi(24,24)
  end = performance.now()
  console.log(res)
  console.log(end-start)  

  start = performance.now();
  wasmModule.instance.exports.push(10)
  wasmModule.instance.exports.push(12)
  wasmModule.instance.exports.push(15)
  
  console.log(wasmModule.instance.exports.getLeng())

  wasmModule.instance.exports.push(11)
  wasmModule.instance.exports.push(14)
  wasmModule.instance.exports.push(13)
  
  console.log(wasmModule.instance.exports.getLeng())
  end = performance.now()
  console.log(end-start) 

  start = performance.now();
  arr.push(10)
  arr.push(12)
  arr.push(15)

  console.log(arr?.length)

  arr.push(11)
  arr.push(14)
  arr.push(13)

  console.log(arr?.length)
  end = performance.now()
  console.log(end-start) 

})();