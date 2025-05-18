/**
 The purpose of this step is:
   to get to know the JS runtime in which we write out load scripts.

   Mind the gotha's marked in the following test handler:
 */

export default () => {
  const arrow = () => { return 'arrow' }
  function hello() { return 'hello' }

  console.log(`
  poking js lang basic constructs
  --------------------------------`)
  console.log("undefined:", undefined )
  console.log("true:", true )
  console.log("false:", false )
  console.log("-123.456", -123.456 )
  console.log("NaN:", NaN )
  console.log("Infinity:", Infinity )
  console.log("null:", null )
  console.log("object passed as reference are stringified: ", {my: "object"} )
  console.warn(`GOTCHA! Back-ticking objects calls .toString() implicitly(): ${ {'this will show': 'as [object Object]'}}`)

  console.warn("GOTCHA! arrow functions are represented as nulls:", arrow )
  console.warn("GOTCHA! functions are represented as nulls:", hello )
  console.warn("GOTCHA! built-in functions are represented as nulls:", console.log )
  console.log("You can .toString() functions to print them:", hello.toString() )
  console.log(`Back-ticking uses .toString() implicitly(): ${hello}` )
  console.warn(`GOTCHA! Remember that back-ticking objects calls .toString() implicitly(): ${ {'this will show': 'as [object Object]'}}`)

  //from here on, all functions are 
  // spat in backtick blocks to invoke their .toString() implicitly

  console.log(`
  Boolean: ${Boolean}
  Number: ${Number}
  String: ${String}
  Object: ${Object}
  Array: ${Array}
  Date: ${Date}

  new Date(): ${new Date}

  JSON: ${JSON}
  JSON.parse: ${JSON.parse}
  JSON.stringify: ${JSON.stringify}

  this: ${this}
  this is the global object: ${ this === global }
  `)

  console.log(`shell colors:
  JS strings understands control characters. 
  e.g. expect colors here (if your shell supports them):
  - \x1B[34mBlue\x1B[39m
  - \x1B[32mGreen\x1B[39m
  - \x1B[33mYellow\x1B[39m
  - \x1B[31mRed\x1B[39m
  `)

  console.log(`
  poking the runtime
  -------------------`)
  console.log(`
  what's in global? 
  ${Object.keys(global).sort().join("\n  ")}

  what's in __ENV? here's stringified (200 first characters):
  ${JSON.stringify(__ENV, null, 2).slice(0,200)}...

  what's __VU and __ITER? (these make more sense when running multiple VUs and multiple iterations)`)
  console.log({ __VU, __ITER })


  console.log(`
  built in console object
  ------------------------
  console: ${console}
  console.log: ${console.log}
  console.debug: ${console.debug}
  console.info: ${console.info}
  console.warn: ${console.warn}
  `)

  console.log(`These come from an internal JS library
  ----------------------------------------------------
  setTimeout: ${setTimeout}
  setInterval: ${setInterval}
  clearTimeout: ${clearTimeout}
  clearInterval: ${clearInterval}
  `)

  console.log(`these are implemented in go, and made available to JS runtime
  ---------------------------------------------------------------------------
  open: ${open}
  require: ${require}
  `);

}
