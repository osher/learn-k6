/*

Naive = load spikes with nothing in between.

because the sleep is the same for all agents, given the SUT has a consistent latency, 
they produce load in spikes, where they all request together and they all sleep together.

running this test with -i 500 -u 20 leads to spikes of 20 requests.

```sh
k6 run part-1.barebones/04.sleep.00.naive.js -i 200 -u 20   
```

organic users do not behave like that.

*/

import { sleep } from 'k6';
import http from 'k6/http';

export default () => {
  const list = http.get('http://localhost:3004/list');

  sleep(0.5);

  const body = list.json();
  const { catalog } = body;

  const itemId = itemFrom(catalog);
  const item = http.get('http://localhost:3004/item/' + itemId);

  console.log(JSON.stringify(item.json(), null, 2));

  sleep(0.5);
}

function itemFrom(array) {
  const index = Math.floor( Math.random() * array.length );
  return array[index];
}
