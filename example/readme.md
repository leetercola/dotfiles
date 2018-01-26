# Next Core
Project Structure based on [react-modern-library-boilerplate](https://github.com/transitive-bullshit/react-modern-library-boilerplate)
Example app scaffolded by [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents) user guide can be found at the link.

## Table of contents

- [Performance HowTo's](#table-of-contents)
- [Active Development Steps](#active-development-steps)
- [Requirements](#requirements)
- [Install](#install)
- [Scripts](#scripts)
- [Supported es6 features](#supported-es6-features)
- [StoryBook](#storybook)

## Performance HowTos

- [Render considerations](https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f)
- DO not define variables or defaults within the render function itself.
  - `this.props.options || []`
- Bind all class functions in the constructor to this instance or use arrow functions which are automatically context bound
- Avoid using redux & connecting state/props for every component. Push those to container elements, along with business logic. See [ducks modular redux proposal](https://github.com/erikras/ducks-modular-redux) for more details.
- Use internal state instead and only for tracking component/user state not business logic. Give implementing container elements change handler functions with data so that business logic can be handled in the correct places. This will make components truly composable and reusable across applications
- Do not use sagas/observable they seem cool and everyone's really into mobx but there are a variety of issues with both.
  - Spec for observable isn't finished or very well supported by browsers or pollyfills
  - Most implementations & documentation for Sagas/Observerable end up creating essentially two way data binding which pretty much breaks what React is trying to do from the start. Which is easier and less repeated code at the start but doesn't scale, read, or troubleshoot well
  - Sagas are not easy to reason or write, and the side effects are often unpredictable and hard to debug.

## Active development Steps

mdt-core-components is published as a node module. The repo itself contains an /example folder which has it's own install and scripts. From the example/node_modules run ```rm -rf mdt-core-components``` followed by ```ln -sf ~/path/to/mdt-core-components mdt-core-components``` This will symlink the built source files to the example app.

From there you can run ```npm run storybook``` to view and develop style guide stories using mdt-core-components components. If you want live editing in the components as well as the style guide from mdt-core-components root run ```npm start``` this will build and live reload any src component changes.

These steps can be duplicated in other applications using mdt-core-components.

## Requirements

- node >= v6
- React >= v16
- Reactstrap
- Redux
- redux-first-router
- whatwg-fetch

mdt-core-components has react, react-dom, prop-types, and reactstrap as peer dependencies. The consuming application needs to have these as dependencies in package.json file in order to function correctly.

## Install

in command line from root

```bash
npm install
```

Or

```bash
yarn install
```

## Scripts

 npm or yarn

 __Start__ : builds css with node-sass-chokidar and watches files with rollup.js to dist [localhost:3000](http://localhost:3000)

 ```shell
 yarn start
 ```

__Build__ : will run dev or production builds based on `NODE_ENVIRONMENT` variable

```shell
yarn run build
```

__Test__ : runs unit tests through [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) and [Enzyme](https://github.com/airbnb/enzyme) for headless testing. TODO: add jest [snapshots](https://facebook.github.io/jest/docs/en/snapshot-testing.html#content) for automated functional testing.

```shell
yarn run test
```

__Analyze__ : output webpack build analysis report

```shell
yarn run analyze
```

__Storybook__ : from mdt-core-components/example will run storybook living style guide as local development tool at [localhost:6006](http://localhost:6006)

```shell
cd example
yarn run storybook
```

__Build-storybook__ : builds a static version of the storybook for deployment to a yet undetermined location

```shell
cd example
yarn run build-storybook
```

__Storyshot__ : builds automatic jest snapshots based on storybook component stories

```shell
cd example
yarn run
```

### Supported es6 features

- [Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
   ```js
   import Thing from 'thing';
   import * as Thing from './thing';
   import Default, {OtherModule} from 'thing';
   export function Thing () {};
   export class Thing extends OtherThing {}
   export default class Thing {}
   ```
- Object [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

```js

var o = {p: 42, q: true};
var {p, q} = o;
// with defaulting
var {a = 10, b = 5} = {a: 3};
// function example
function drawES2015Chart({size = 'big', cords = {x: 0, y: 0}, radius = 25} = {}) {}
// rest
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
console.log(rest) //output = { c: 30, d: 40 }
// spread
myFunction(...iterableObj); // function
let objClone = { ...obj }; // object literals

```

- [Arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) functions.
  - `this` is correctly bound for you in

```js

(param1, param2, â€¦, paramN) => { statements }
(param1, param2, â€¦, paramN) => expression
// equivalent to: (param1, param2, â€¦, paramN) => { return expression; }

// Parentheses are optional when there's only one parameter name:
(singleParam) => { statements }
singleParam => { statements }

// A function with no parameters should be written with a pair of parentheses.
() => { statements }

```

## StoryBook

[automatic jest snapshot](https://github.com/mthuret/storybook-addon-specifications#snapshot-all-your-stories-automatically)

## Issues

> Error: Error watching file for changes: EMFILE when running `npm test` [Found here](https://github.com/facebook/jest/issues/3436)

Seems to be an issue with jest, sierra, and watching files. Try:  // Tracking actual resolution if it occurs

- restarting your computer
- uninstalling all node_modules
- check your version of npm and install newest version
- clean install with npm instead of yarn
- last resorts `brew install watchman`
  - I hate hate hate having to do this but it's the only step that worked for me. (TC Follansbee)
