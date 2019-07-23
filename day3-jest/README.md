<h1>Jest - JavaScript Testing Framework</h1>

Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!

Jest JavaScript resting framework with a focus on simplicity. Jest was created by Facebook engineers for its React project.

Unit testing is a software testing where individual units (components) of a software are tested. The purpose of unit testing is to validate that each unit of the software performs as designed. A unit is the smallest testable part of any software.

Mocking is technique where code parts are replaced by dummy implementations that emulate real code. Mocking helps achieve isolation of tests. Mocking is primarily used in unit testing.

In our tests we check that values meet certain conditions. The expect() function gives us a number of matchers that let us validate different things, such as toBe(), toBeFalsy(), or toEqual().

In this tutorial we work with Jest in a Node application.

## Why Jest
* Very fast.
* Snapshot testing.
* Awesome interactive watch mode that reruns only tests that are relevant to your changes.
* Helpful fail messages.
* Simple configuration.
* Mocks and spies.
* Coverage report with a single command line switch.
* Active development.
* Impossible to write silently wrong asserts like expect(foo).to.be.a.function instead of expect(foo).to.be.a(‘function’) in Chai because it’s the only natural thing to write after (correct) expect(foo).to.be.true.

## Setting up Jest
```JS
npm install --save-dev jest
```
Let's get started by writing a test for a hypothetical function that adds two numbers. First, create a sum.js file:
```JS
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
Then, create a file named sum.test.js. This will contain our actual test:
```JS
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
Add the following section to your package.json:
```JS
{
  "scripts": {
    "test": "jest"
  }
}
```
Finally,run <strong>npm run test</strong> and Jest will print this message:
```JS
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```
## Common Matchers
The simplest way to test a value is with exact equality.
```JS
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```
In this code, <code>expect(2 + 2)</code> returns an "expectation" object. You typically won't do much with these expectation objects except call matchers on them. In this code, <code>.toBe(4)</code> is the matcher. When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.

<code>toBe</code> uses <code>Object.is</code> to test exact equality. If you want to check the value of an object, use <code>toEqual</code> instead:
```JS
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```
<code>toEqual</code> recursively checks every field of an object or array.

You can also test for the opposite of a matcher:
```JS
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```
## Truthiness
In tests you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.

* <code>toBeNull</code> matches only <code>null</code>
* <code>toBeUndefined</code> matches only <code>undefined</code>
* <code>toBeDefined</code> is the opposite of <code>toBeUndefined</code>
* <code>toBeTruthy</code> matches anything that an <code>if</code> statement treats as true
* <code>toBeFalsy</code> matches anything that an <code>if</code> statement treats as false

For example:
```JS
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```
You should use the matcher that most precisely corresponds to what you want your code to be doing.
## Numbers
Most ways of comparing numbers have matcher equivalents.
```JS
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```
For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.
```JS
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```
## Strings
You can check strings against regular expressions with <code>toMatch</code>:
```JS
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
## Arrays and iterables
You can check if an array or iterable contains a particular item using <code>toContain</code>:
```JS
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```
## Exceptions
If you want to test that a particular function throws an error when it's called, use <code>toThrow</code>.
```JS
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

