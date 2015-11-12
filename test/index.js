import test from 'tape';
import 'tap-dev-tool/register';

const COMPONENT = 'randomColor > ';

function setup(randomValue, callback) {
  // override random.js
  System.set(System.normalizeSync('../src/random.js'), System.newModule({
    default: () => randomValue // return our custom value
  }));
  // reimport randomColor, pass to callback
  return System.import('../src/randomColor.js').then((module) => {
    let randomColor = module.default;
    callback(randomColor);
  });
}
function teardown() {
  System.delete(System.normalizeSync('../src/random.js'));
  System.delete(System.normalizeSync('../src/randomColor.js'));
}

test(COMPONENT+'with random 255', (assert) => {
  setup(255, (randomColor) => {
    const actual = randomColor();
    const expected = [255,255,255];
    assert.deepEqual(actual,expected,
      'should generate colors with 255')
    assert.end();
    teardown();
  });
});
test(COMPONENT+'with random 127', (assert) => {
  setup(127,(randomColor) => {
    const actual = randomColor();
    const expected = [127,127,127];
    assert.deepEqual(actual,expected,
      'should generate colors with 127')
    assert.end();
    teardown();
  });
});
test(COMPONENT+'with random 0', (assert) => {
  setup(0,(randomColor) => {
    const actual = randomColor();
    const expected = [0,0,0];
    assert.deepEqual(actual,expected,
      'should generate colors with 0')
    assert.end();
    teardown();
  });
});
