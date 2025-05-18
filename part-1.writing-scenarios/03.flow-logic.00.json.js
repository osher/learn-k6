import http from 'k6/http';

export default () => {
  const list = http.get('http://localhost:3004/list');

  const body = list.json();
  const { catalog } = body;

  const itemId = itemFrom(catalog);
  const item = http.get('http://localhost:3004/item/' + itemId);

  console.log(JSON.stringify(item.json(), null, 2));
}

function itemFrom(array) {
  const index = Math.floor( Math.random() * array.length );
  return array[index];
}
