/**
 to show how the VU work - run this script with cli args: -i 20 -u 3

 e.g.
 ```sh
 k6 run 08.context-execution.01-ids.js -i 20 -u 3
 ```
 */

import { sleep } from 'k6';
import execution from 'k6/execution';

export default () => {
  const {
    scenario: { iterationInTest },
    vu: { iterationInInstance, iterationInScenario, idInTest, idInInstance },
  } = execution

  console.log({ 
    iterationInTest, 
    instance: {
      iteration: iterationInInstance, 
      id: idInInstance,
    },
    idInTest,
    iterationInScenario,
  })

  sleep(1);
}
