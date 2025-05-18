import { sleep, check, group } from 'k6';
import http from 'k6/http';

export default () => {
  let list;
  group('list', () => {
    list = http.get('http://localhost:3004/list');

    check(list, {
      'list should return code 200': list => list.status == 200,
      'list body has a catalog array': list => Array.isArray(list.json().catalog),
    });

    sleep(between(0.2, 0.8));
  });

  group('item :) ', () => {
  
    const { catalog } = list.json();

    const itemId = itemFrom(catalog);
    const item = http.get('http://localhost:3004/item/' + itemId);

    check(item, {
      'item should return code 200': item => item.status == 200,
      'item should have item object': item => typeof item.json().item === 'object',
      'item should have item.id': item => typeof item.json().item.id !== 'undefined',
    });

    sleep(between(0.2, 0.8));
  });
}

function between(fromSec, toSec) {
  return fromSec + Math.random() * ( toSec - fromSec )
}

function itemFrom(array) {
  const index = Math.floor( Math.random() * array.length );
  return array[index];
}
