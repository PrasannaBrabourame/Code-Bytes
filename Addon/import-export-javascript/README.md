<h1>Import - Export - JavaScript</h1>

This is a <strong>default import</strong>:
```JS
// B.js
import A from './A'
```
It only works if <code>A</code> has the <strong>default export</strong>:

```JS
// A.js
export default 42
```
In this case it doesn’t matter what name you assign to it when importing:
```JS
// B.js
import A from './A'
import MyA from './A'
import Something from './A'
```
Because it will always resolve to whatever is the <strong>default export</strong> of <code>A</code>.

This is a <strong>named import called</strong> <code>A</code>:
```JS
import { A } from './A'
```
It only works if A contains a <strong>named export called</strong> <code>A</code>:
```JS
export const A = 42
```
In this case the name matters because you’re importing <strong>a specific thing by its export name</strong>:
```JS
// B.js
import { A } from './A'
import { myA } from './A' // Doesn't work!
import { Something } from './A' // Doesn't work!
```
To make these work, you would add a <strong>corresponding named export</strong> to <code>A</code>:
```JS
// A.js
export const A = 42
export const myA = 43
export const Something = 44
```
A module can only have <strong>one default export</strong>, but <strong>as many named exports as you'd like </strong>(zero, one, two, or many). You can import them all together:
```JS
// B.js
import A, { myA, Something } from './A'
```
Here, we import the default export as A, and named exports called myA and Something, respectively.
```JS
// A.js
export default 42
export const myA = 43
export const Something = 44
```
We can also assign them all different names when importing:
```JS
// B.js
import X, { myA as myX, Something as XSomething } from './A'
```
The default exports tend to be used for whatever you normally expect to get from the module. The named exports tend to be used for utilities that might be handy, but aren’t always necessary. However it is up to you to choose how to export things: for example, a module might have no default export at all.
[JS Import Export](https://i.stack.imgur.com/uCCXS.png)

There are 4 types of exports. Here are usage examples of each, along with some imports that use them:

<strong>Export Syntax</strong>

```JS
// default exports
export default 42;
export default {};
export default [];
export default (1 + 2);
export default foo;
export default function () {}
export default class {}
export default function foo () {}
export default class foo {}

// variables exports
export var foo = 1;
export var foo = function () {};
export var bar;
export let foo = 2;
export let bar;
export const foo = 3;
export function foo () {}
export class foo {}

// named exports
export {};
export {foo};
export {foo, bar};
export {foo as bar};
export {foo as default};
export {foo as default, bar};

// exports from
export * from "foo";
export {} from "foo";
export {foo} from "foo";
export {foo, bar} from "foo";
export {foo as bar} from "foo";
export {foo as default} from "foo";
export {foo as default, bar} from "foo";
export {default} from "foo";
export {default as foo} from "foo";
```
<strong>Import Syntax</strong>
```JS
// default imports
import foo from "foo";
import {default as foo} from "foo";

// named imports
import {} from "foo";
import {bar} from "foo";
import {bar, baz} from "foo";
import {bar as baz} from "foo";
import {bar as baz, xyz} from "foo";

// glob imports
import * as foo from "foo";

// mixing imports
import foo, {baz as xyz} from "foo";
import foo, * as bar from "foo";

// just import
import "foo";
```
