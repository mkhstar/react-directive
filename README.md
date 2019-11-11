
# react-directive

> A conditional or listing directives for react apps

[![NPM](https://img.shields.io/npm/v/react-directive.svg)](https://www.npmjs.com/package/react-directive) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i react-directive
```

## Introduction
react-directive is a library for creating conditional or listing directives in a react app.
It takes a lot of inspiration from Vue.js' conditional and listing directives such as v-if and v-for
 Its two main purposes are listed below.
- To avoid the headache of using conditional (ternary) operators or higher order array methods such as map for list rendering.
- To keep JSX clean and concise.

## Usage
To use react-directive import it to your component.
```jsx
import  React  from  'react';
import  ReactDirective  from  'react-directive';

const  MyComponent  =  props  =>  {
	return (
		<ReactDirective>
			{/* Components or Elements here can now use data-react-if and data-react-for directives */}
		</ReactDirective>
	);
}

export  default  MyComponent;
```

## Conditional Rendering
The directive `data-react-if` is used to conditionally render a block. The block will only be rendered if the directive’s expression returns a **truthy** value.
```jsx
	

```











## Pull Requests
Pull requests are welcome. Especially for testings
## License

MIT © [mkhstar](https://github.com/mkhstar)
