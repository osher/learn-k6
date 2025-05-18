import http from 'k6/http'

const inspect = v => JSON.stringify(v, null, 2)

export default () => {
  const res = http.get('http://localhost:3004/list')

  console.log('response properties', inspect(res))
  
  console.log('response APIs', inspect(responseAPIs(res)))

  console.log('response.json()', inspect(res.json()))
}

/**
 APIs recognized on response objects are - 
   properties whose value is a function 
   (and therefore are not serialized in by inspect(res))
 */
function responseAPIs(res) {
  return Object.keys(res)
    .sort()
    .filter(k => 'function' == typeof res[k])
}
