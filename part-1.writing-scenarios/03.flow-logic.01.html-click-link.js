import http from 'k6/http'

const inspect = v => JSON.stringify(v, null, 2)

export default () => {
  const html = http.get('http://localhost:3004/html')
  console.log('body', html.body)
  console.log('res.html', html.html())
  console.log('res.html() APIs - are DOM APIs', inspect(apis(html.html())))  

  const json = html.clickLink({ selector: "a.jsonCatalog" })
  console.log(inspect(json.json()))
}

/**
 APIs recognized on response objects are - 
   properties whose value is a function 
   (and therefore are not serialized in by inspect(res))
 */
   function apis(res) {
    return Object.keys(res)
      .sort()
      .filter(k => 'function' == typeof res[k])
  }
  