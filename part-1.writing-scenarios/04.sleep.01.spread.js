/**
 here, the sleep value is randomized from a range.
 this breaks the unison between the VUs and produces a more organic behavior:

 ```sh
 k6 run part-1.barebones/04.sleep.01.spread.js -i 200 -u 20   
 ```

 */
import { sleep } from 'k6';
import http from 'k6/http';

export default () => {
  const list = http.get('http://localhost:3004/list');

  sleep(between(0.2, 0.8));

  const body = list.json();
  const { catalog } = body;

  const itemId = itemFrom(catalog);
  const item = http.get('http://localhost:3004/item/' + itemId);

  console.log(JSON.stringify(item.json(), null, 2));

  sleep(between(0.2, 0.8));
}

function between(fromSec, toSec) {
  return fromSec + Math.random() * ( toSec - fromSec )
}

function itemFrom(array) {
  const index = Math.floor( Math.random() * array.length );
  return array[index];
}
