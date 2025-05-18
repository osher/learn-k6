/**
 to show how the VU work - run this script with cli args: -i 10 -u 3

 e.g.
 ```sh
 k6 run 07.shared-data-and-setup.js -i 10 -u 3
 ```
 */
import { SharedArray } from 'k6/data';
import http from 'k6/http';


const data = new SharedArray('data1', () => {
  const data = JSON.parse(open('07.shared-data.json'));
  console.log('init time', data)
  return data
})

export const setup = () => {
  const data = http.get('http://localhost:3004/list').json().catalog
  console.log('setup time', data)
  return data
}

export default (setup) => {
  console.log('the data', data, setup)
}
