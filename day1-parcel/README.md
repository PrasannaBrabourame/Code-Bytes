<h1>Set Up A React Project With Parcel: The Zero Configuration App Bundler</h1>

When it comes to web application bundling, there's a new kid on the block and that's Parcel. ParcelJS is a relatively new bundler that was launched sometime around October, last year. Parcel describes itself as a blazing fast, zero-configuration web application bundler.

Parcel is based on the premise that building apps with JavaScript bundlers could be easier. Wepback is arguably the most popular bundler out there right now, it's an awesome tool that gives you the power of configurability but sometimes all you need is a minimal tool that helps you get started as soon as possible.

This is where Parcel comes in. It touts itself as a fast bundle tool with zero configuration, all you need to is just point it at the entry point of your application, and it does the right thing. Parcel offers the following features:

* Blazing fast bundle times - Parcel has a considerably faster time than other bundling tools out there. Below is a screenshot of the Parcel page on Github. 
* Assets Bundling - Parcel has out of the box support for JS, CSS, HTML, file assets.
* Automatic transforms - All your code are automatically transformed using Babel, PostCSS, and PostHTML.
* Code Splitting - Parcel allows you to split your output bundle by using the dynamic import() syntax.
* Hot module replacement (HMR) - Parcel automatically updates modules in the browser as you make changes during development, no configuration needed.
* Error Logging - Parcel prints syntax highlighted code frames when it encounters errors to help you pinpoint the problem.

## Getting Started With Parcel

Let's get right into it and see how Parcel works. Create a new working directory and install Parcel by running the command below in your terminal.

```sh
npm install -g parcel-bundler
```

## Parcel and React

That's all there is to get started. Next, let's actually setup a React project with Parcel. Before we go on, we'll need to install some dependencies.

```sh
npm i react react-dom 
```
The dependencies above will help to install React and react-dom in our application. Since React is written in ES6, we'll need a way to transform the code. Parcel does that for you with no need for configs, all you have to do is install the presets and Parcel does all the heavy lifting for you.

```sh
npm i @babel/core @babel/preset-env @babel/preset-react --save-dev
```
Once that's done, create a .babelrc file and edit it with the following:

```JS
{     
    "presets": [
        "@babel/preset-env", 
        "@babel/preset-react"
        ] 
}
```

Now Babel is configured to transform ES6/ES7 JavaScript into a meaningful JavaScript bundle for browsers.

Let's begin to create the React app and its components. Open up the index.html file and replace it with the code below.

```html
<!DOCTYPE html>
<html>
<head>
    <title>React starter app</title>
</head>
<body>
<div id="app"></div>
<script src="./src/index.js"></script>
</body>
</html>
```

Next up, create a folder titled src and in it create an index.js file and edit it with the following.

```JS
import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
    render() {
        return <div>
            <div className="container">
                <h1>Hello {this.props.name}</h1>
            </div>
        </div>
    }
}

let App = document.getElementById("app");

ReactDOM.render(<HelloMessage name="hello world" />, App);
```

As you can see above, Parcel also supports import of assets like images. One more thing to note is that, Parcel also ships with SCSS support. All you need to do is install <strong>node-sass</strong>, which can be done with the terminal command below.

```sh
npm i node-sass
```
Once you have node-sass installed you can import SCSS files from JavaScript files. In your <strong>index.js</strong> file, add the line of code below to the top of the file to import an SCSS file.

```JS
import './scss/app.scss'
```
Let's also create the <strong>app.scss</strong> file. Create a folder titled <strong>scss</strong> and create a file titled <strong>app.scss</strong> and edit it with the following.

```scss
body {
  background-color: #fefefe;
  text-align: center;
  .navbar {
    background: #21374B;
    color: #E7DACB;
    height: 50px;
  }
  h1 {
    font-size: 40px;
    margin-top: 30px;
  }
}
```
Now that we're done setting up the React app, let's run it and see if it works. To do that, we'll need to start a dev server and configure our <strong>package.json</strong>. Add the line of code below to the <strong>package.json</strong> file.
```JS
"scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  }
```