import execution from 'k6/execution';

const show = (name, v) => console.log(`\n\x1B[32m--- ${name} ---\x1B[39m ${JSON.stringify(v, null, 2)}`);

export default () => {
  console.log(Object.keys(execution))

  show('vu', execution.vu)

  show('scenario', execution.scenario)

  show('instance', execution.instance)

  show('test', execution.test)
}
