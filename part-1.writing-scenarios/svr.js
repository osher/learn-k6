const { createServer } = require('node:http');
const { inspect } = require('node:util');

const log = (...a) => console.log(new Date().toJSON(), ...a);

const catalog = {
  shoes: { price: 12.99, color: 'brown' },
  shirt: { price: 8.99, color: 'red' },
  jacket: { price: 15.49, color: 'yellow' },
}

const catalogStr = JSON.stringify({
  status: 'ok',
  catalog: Object.keys(catalog),
});
const notFoundStr = JSON.stringify({
  status: 'not found',
})

Object.entries(catalog).forEach(([id, item]) => {
  catalog[id] = JSON.stringify({ status: 'ok', item: { id, ...item } });
});

const svr = createServer((q, a) => {
  a.setHeader('content-type', 'application/json');
  const [,action = 'not-found',,id] = q.url.match(/^\/([^\/]+)(\/(.+))?$/) || [];

  switch(action) {
    case 'exit':
      process.exit();
      break;
    case 'list': 
      a.end(catalogStr);
      break;
    case 'item':
      const response = catalog[id];
      if (response) {
        a.end(response);
        break;
      }
    case 'html':
      a.end('<html><body>welcome.<br>see <a class="jsonCatalog" href="/list">json catalog</a></body></html>');
      break;
    default:
      a.statusCode = 404;
      a.end(notFoundStr);
  }

  log('[http]', a.statusCode, q.url);
});

svr.listen(3004, (err) => err ? log(err) : log('[svr] started', svr.address()));
