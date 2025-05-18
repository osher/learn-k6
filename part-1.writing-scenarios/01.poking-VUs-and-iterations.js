/**
 to show how __VU and __ITER work - run this script with cli args: -i 10 -u 3

 e.g.
 ```sh
 k6 run 01.poking-VUs-and-iterations.js -i 10 -u 3
 ```
 */

export default () => {
  console.log({ __VU, __ITER })
}
