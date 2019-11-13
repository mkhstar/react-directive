
# react-directive

> A conditional or listing directives for react apps

[![NPM](https://img.shields.io/npm/v/react-directive.svg)](https://www.npmjs.com/package/react-directive) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i react-directive
```

## Introduction
`react-directive` is a library for creating conditional or listing directives in a react app.
It takes a lot of inspiration from [Vue.js'](https://vuejs.org/) conditional and listing directives such as v-if and v-for.
 Its two main purposes are listed below.
- To avoid the headache of using conditional (ternary) operators or higher order array methods such as map for list rendering.
- To keep JSX clean and concise.

## Usage
To use `react-directive` import it to your component.
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

export default MyComponent;
```

## Conditional Rendering

### Usage

The directive `data-react-if` is used to conditionally render a block. The block will only be rendered if the directive’s expression returns a **truthy** value.
```jsx
<ReactDirective>
	<div  data-react-if={true}>Render This</div>
	<div  data-react-if={false}>Don't Render This</div>
</ReactDirective>
/*
	Renders
	<div>Render This </div>
*/
```
### Arguments

- Any

### Values Passed

Notice that in the example above we are passing Boolean values as arguments. This is recommended but optional. You could pass the following:
- 0 which is falsy
- 1 which is truthy
- '' which evaluates to falsy
- 'not empty' which evaluates to truthy
- Check out truthy and falsy values in javascript [here](https://j11y.io/javascript/truthy-falsey/%5D%28https://j11y.io/javascript/truthy-falsey)

### Nesting

Conditional Rendering works even in a deeply nested element.
```jsx
<ReactDirective>  
	<div>
		<span data-react-if={false}>Should not Render</span>
		<span data-react-if={true}>
			Should Render 
			<span data-react-if={false}> 
			Should not Render
			</span> 
		</span>
	</div>
	<div data-react-if={false}>Don't Render This</div>  
</ReactDirective>
/*
	Renders
	<span> Should Render </span>
*/
```

### Custom Components

`data-react-if` can also be used for custom components as well
```jsx
	<Component data-react-if={true} />
	<AnotherComponent data-react-if={false} />
	/*
		Renders
		<Component data-react-if={true} />
	*/
```

## List Rendering

### Arguments
The `data-react-for` receives one argument which should be one of the types below:

 - Array
 - Object
 - Number

### Usage

The directive `data-react-for` is used to render a list of items. 
```jsx
	
<div  data-react-for={['Musah',  'Kusi',  'Hussein']}>{name  =>  `His name is ${name}`}</div>/*
	Renders
	<div>His name is Musah</div>
	<div>His name is Kusi</div>
	<div>His name is Hussein</div>	
	*/
```
### `data-react-for` Children
You might have noticed that we are passing a function and return a `string` with a name variable. 
It is important to know that if you want the values of the elements in the list you passed, you must pass a function to be able to access them. Else it will just repeat the children the number of times with respect to the value passed to `data-react-for`.

 -  ####  When an array is passed in the `data-react-for` directive :

You can pass a function as a child (render prop) to receive the value and the index of the array. 
**Note** that you can return anything from your function including `JSX`
Example below: 
 
```jsx
	
<div  data-react-for={['Musah',  'Kusi',  'Hussein']}>{(name, index)  =>  `${index + 1}. His name is ${name}`}</div>

	/*
	Renders
	<div>1. His name is Musah</div>
	<div>2. His name is Kusi</div>
	<div>3. His name is Hussein</div>	
	*/
```

When you pass  a child anything other than a function, it will just repeat the element in accordance with the length of the array. Example below: 

```jsx
	
<div  data-react-for={['Musah',  'Kusi',  'Hussein']}> I am repeated three times </div>

	/*
	Renders
	<div> I am repeated three times </div>
	<div> I am repeated three times </div>
	<div> I am repeated three times </div>
	*/
```
 -  #### When an object is passed in the `data-react-for` directive :
 
 You can pass a function as a child (render prop) to receive the value, key, and the index of the object.
**Note** that you can return anything from your function including `JSX`
 Example below:

```jsx
	<p  data-react-for={{ name:  'Musah', dateOfBirth:  'January, 1996'  }}>
		{(val,  k,  ind)  =>  `${k}: ${val}`}
	</p>

	/*
	Renders
	<p>name: Musah</p>
	<p>dateOfBirth: January, 1996</p>
	*/
```
 When you pass  a child anything other than a function, it will just repeat the element in accordance with the number of keys in the `Object`. Example below:
  
```jsx
	<p  data-react-for={{ name:  'Musah', dateOfBirth:  'January, 1996'  }}>
		I am repeated twice
	</p>

	/*
	Renders
	<p>I am repeated twice</p>
	<p>I am repeated twice</p>
	*/
```
 
  -  #### When a number is passed in the `data-react-for` directive :
 
 You can pass a function as a child (render prop) to receive the counter and index values.
**Note** that you can return anything from your function including `JSX`
 Example below:

```jsx
	<p  data-react-for={{ name:  'Musah', dateOfBirth:  'January, 1996'  }}>
		{(val,  k,  ind)  =>  `${k}: ${val}`}
	</p>

	/*
	Renders
	<p>name: Musah</p>
	<p>dateOfBirth: January, 1996</p>
	*/
```
 When you pass  a child anything other than a function, it will just repeat the element in accordance with the number. Example below:
  
```jsx
	<span  data-react-for={[1,  2,  3]}>{n  =>  n}</span>

	/*
	Renders
	<span>1</span>
	<span>2</span>
	<span>3</span>
	*/
```
 ### Nesting
 The `data-react-for` supports deeply nested elements.

### Custom Components

`data-react-for` can also be used for custom components as well
```jsx
	<Component data-react-for={3} />
	/*
		Renders
		<Component  />
		<Component  />
		<Component  />
	*/
```
### Mixing `data-react-for` and `data-react-if`

You can mix both directives as much as you would like but, you have to be careful that data-react-if takes precedence.




## Pull Requests

Pull requests are welcome.

## Documentation Improvement

If you would like to improve this documentation you can send a pull request.

## License

MIT © [mkhstar](https://github.com/mkhstar)
