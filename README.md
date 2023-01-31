
# react-directive

> A conditional, className and listing directive for react apps

[![NPM](https://img.shields.io/npm/v/react-directive.svg)](https://www.npmjs.com/package/react-directive) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# npm
npm i react-directive

# yarn 
yarn add react-directive
```

# Introduction
`react-directive` is a library for creating conditional or listing directives in a react app.
It takes a lot of inspiration from [Vue.js'](https://vuejs.org/) conditional, class bindings and listing directives such as `v-if`, `v-for`, and `:class`.
 Its two main purposes are listed below.
- To avoid the headache of using conditional (ternary) operators or higher order array methods such as map for list rendering.
- To keep JSX clean and concise.

# Usage
To use `react-directive` import it to your component.
```jsx
import  React  from  'react';
import  directive  from  'react-directive';

const  MyComponent  =  props  =>  {
	return (
        // This is the same as a div element but has more features like dirIf, dirFor, extended className etc.
		<directive.div>
			{ /* Any children for the div element */ }
		</directive.div>
	);
}

export default MyComponent;
```

# Conditional Rendering

`react-directive` provides directives such as `dirIf`, `dirShow` and components `<Switch />`, `<Case />` `<Default />` to render (show) or remove (hide) an element from the page.


## Prop `dirIf`

The prop `dirIf` is used to conditionally render a block. The block will only be rendered if the directive’s expression returns a **truthy** value (Check out truthy and falsy values in javascript [here](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)). It works like `v-if` for `Vuejs` and `ngIf` for angular.

Currently, there is no support for `else` and `else-if` yet. ( You can use the `<Switch />` component to handle such cases. More on that later ).

**Note**: `undefined` is the only exceptional falsy value that evaluates to `true` because the default  value for `dirIf` is true

### Usage

The example component below renders a `div` element only if the name's length is greater than `4` otherwise it will just render a `null` value. If you want to keep the `node` and only toggle style's display value, use the `dirShow` prop instead.

```jsx
import  React, { useState }  from  'react';
import  directive  from  'react-directive';

const  MyComponent  =  props  =>  {
    const [currentName, setCurrentName] = useState('Musah');

	return (
		<directive.div dirIf={currentName.length > 4}>
			Div contents
		</directive.div>
	);
}

export default MyComponent;
/*
	When dirIf is truthy, it renders
	<div>Div contents</div> 

    When dirIf is falsy, it renders nothing
*/
```


## Prop `dirShow`

The prop `dirShow` is used to conditionally show a block. The block will only be shown if the directive’s expression returns a **truthy** value. It works like `v-show` for `Vuejs`.

**Note**: `dirShow` takes precedence to any another display for styles. For example if you set the display to block and `dirShow` is `false`, it will still hide the element.
**Note**: `undefined` is the only exceptional falsy value that evaluates to `true` because the default  value for `dirShow` is true

### Usage
The example component below shows a `div` element only if the name's length is greater than `4` otherwise it will hide the `div` element by add the `display:none` to its styles.



```jsx
import  React, { useState }  from  'react';
import  directive  from  'react-directive';

const  MyComponent  =  props  =>  {
    const [currentName, setCurrentName] = useState('Musah');

	return (
		<directive.div dirShow={currentName.length > 4}>
			Div contents
		</directive.div>
	);
}

export default MyComponent;
/*
	When dirShow is truthy, it renders
	<div>Div contents</div> 

    When dirShow is falsy, it renders
    <div style="display:none;">Div contents</div>
*/
```

## Component `<Switch />`

The `<Switch />` component is used to conditionally render a `<Case />` that resolves to a truthy value. Otherwise it renders `<Default />` (If it exists).

### Usage
The example component below shows the `div` element with contents `Case 2` because it is the first case that resolves to a truthy value.

Note that the `when` prop for the `<Case />` component supports either a (truthy | falsy) value or a function that returns a (truthy | falsy) value.
It is recommended to use the function version if the calculation is intensive. This helps in short circuiting (lazy evaluation) when the case is not reached.



```jsx
import  React, { useState }  from  'react';
import  directive  from  'react-directive';

const  MyComponent  =  props  =>  {
    const [currentName, setCurrentName] = useState('Musah');

    // This makes it more concise to render an element instead of using nested ternary operator. 
    // Fun fact: I was getting lots of eslint problems because of using ternary operators which was one of my main motivations for building this library.
	return (
		<Switch>
          <Case when={!currentName.length}>
            <div>Case 1</div>
          </Case>
          <Case when={currentName.length > 4}>
            <div>Case 2</div>
          </Case>
          {/* The case below resolves to true but the case above will render because it is the first match */}
          <Case when> 
            <div>Case 3</div>
          </Case>
          <Default>
            <div>Default</div>
          </Default>
        </Switch>
      );
	);
}

export default MyComponent;
/*
	renders
    <div>Case 2</div>
*/
```


# Class Names
A common need for data binding is manipulating an element's class list.
`react-directive` provides the hook `useClassName` and an extended version of the `className` prop to handle this issue

## Hook `useClassName`
A simple hook for generating class names.

### Usage
The hook takes in two optional parameters: `classes` and `deps` (dependencies).

- `classes` can be a string, an array of strings, an object with class names as keys and truthy values, or an array of such objects.

- `deps` is an optional dependencies array that tells the hook to re-run when one of its values changes.

**Note**: When dependencies are not passed, it will fallback to re-calculate the class names based on the classes argument itself. Also it is advisable to pass an array of primitive values or cached values. So that it doesn't re-calculate unnecessarily. Think of it like a `useEffect` dependency.

Here are some basic examples:

```tsx
import { useClassName } from 'react-directive';

function Component() {
  const className = useClassName({
    active: true,
    disabled: false,
  });

  return <div className={className}>Contents</div>;
}

// Renders <div class="active">Contents</div>
```

You can also pass an array of objects, strings, or a combination of both:

```tsx
import { useState } from 'react'
import { useClassName } from 'react-directive';

function Component() {
  const [isActive, setIsActive] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const className = useClassName([
      'highlighted',
    { active: isActive, disabled: isDisabled },
  ], [isActive, isDisabled]); // Optional deps to tell it to re-calculate based on isActive and isDisabled values

  return <div className={className}>Contents</div>;
}
// Renders <div class="highlighted active">Contents</div>
// This is useful if you have some other classNames that doesn't have to react to any value
```

## Prop `className`
`react-directive` extends the default className of React to support what the `useClassName` hook support above. To pass the dependencies, use `classNameDeps` props.

Here are some basic examples:

```tsx
import { useState } from 'react'
import directive from 'react-directive';

function Component() {
  const [isActive, setIsActive] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  return <directive.div className={{isActive, isDisabled}} classNameDeps={[isActive, isDisabled]}  >Contents</directive.div>;
}
// Renders <div class="active">Contents</div>
// classNameDeps is optional but makes it more efficient and performant.
```


# List Rendering

`react-directive` provides the directive `dirFor` and the component `<For />` to generate lists.


## Usage
The `<For />` component takes in an object with two properties: `each` and `children`

- `each` is an array of items that you want to render.

- `children` is a function that takes in two arguments: `value` and `index`. `value` is the current item in the `each` array and `index` is its index in the array.

**Note**: Make sure to pass a unique key prop to the elements rendered by the children function. This is important for React to keep track of the elements and render updates efficiently.


Here is a basic example:

```tsx
import { For } from 'react-directive';

function Component() {
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <For each={items}>
      {(value, index) => <div key={index}>{value}</div>}
    </For>
  );
}

/* renders
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
*/
```

You might have noticed that we are passing a function. It is important to know that if you want the values of the elements in the list you passed, you must pass a function to be able to access them. This works like `<Context.Consumer />`. 

# Pull Requests

Pull requests are welcome. Open pull requests to the pr branch and make sure it all lint and tests are passing.

# License

MIT © [Musah Kusi Hussein](https://github.com/mkhstar)