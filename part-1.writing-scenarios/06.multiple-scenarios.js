import { sleep, check, group } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    list: {
      exec: 'list',
      executor: 'constant-vus',
      duration: '20s',
    },
    item: {
      exec: 'item',
      executor: 'constant-vus',
      duration: '20s',
    },
  },
};

export const list = () => {
  let list;
  group('list scenario', () => {
    list = http.get('http://localhost:3004/list');

    check(list, {
      'list should return code 200': list => list.status == 200,
      'list body has a catalog array': list => Array.isArray(list.json().catalog),
    });

    sleep(rndBetween(0.2, 0.8));
  })

}

export const item = () => {
  group('item scenario', () => {
    const itemId = 'shoes';
    const item = http.get('http://localhost:3004/item/' + itemId);

    check(item, {
      'item should return code 200': item => item.status == 200,
      'item should have item object': item => typeof item.json().item === 'object',
      'item should have item.id': item => typeof item.json().item.id !== 'undefined',
    });

    sleep(rndBetween(0.2, 0.8));
  });
}

function rndBetween(fromSec, toSec) {
  return fromSec + Math.random() * ( toSec - fromSec )
}
