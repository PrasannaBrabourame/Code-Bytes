## Set Up A React Project With Webpack: 

React is the most popular javascript framework which is used by millions of developers around the globe. Creating a React app from Scratch is quite painful as it requires a lot of configuration. We all know that create-react-app gives a nice boilerplate to begin a journey with react, but it lacks some amount of configuration.

Note: In this article, we will learn how to configure the React with Webpack 4 and Babel 7 from scratch in some simple steps.

## Webpack and React

That's all there is to get started. Next, let's actually setup a React project with Webpack. Before we go on, we'll need to install some dependencies.

```sh
npm i react react-dom 
```
The dependencies above will help to install React and react-dom in our application. Since React is written in ES6, we'll need a way to transform the code. Webpack does that for you with no need for configs, all you have to do is install the presets and Webpack does all the heavy lifting for you.

* babel-core: babel transpile ES6 code to ES5
* babel-loader: This is a webpack helper which allows to transpile Javascript files with babel and webpack. It uses babel under the hood
* babel/preset-env: It determines which features needs to be transformed to run within different browsers or runtime versions. This is also known as browser polyfills
* babel/preset-react: It is used to transform all your React JSX into functions.

```sh
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
Once that's done, create a <strong>.babelrc</strong> file and edit it with the following:

```JS
{     
    "presets": [
        "@babel/preset-env", 
        "@babel/preset-react"
        ] 
}
```

Now Babel is configured to transform ES6/ES7 JavaScript into a meaningful JavaScript bundle for browsers.

now installing webpack 

```sh
npm i webpack webpack-cli --save-dev
```

As you can see above, Webpack also supports import of assets like images. One more thing to note is that, Webpack also ships with SCSS support. All you need to do is install sass module, which can be done with the terminal command below.

```sh
npm install sass-loader style-loader css-loader node-sass --save-dev
```

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

Install HTML web pack plugin and HTML loader for displaying our page

htmlWebPackPlugin: This generates the HTML dynamically, with an <script> tag including our bundled js file.

```sh
npm i html-webpack-plugin html-loader --save-dev
```

Now, create a <strong>webpack.config.js</strong> file inside our project folder and insert the below code into it

```JS
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ]
};
```

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
Install webpack-dev-server

<strong>webpack-dev-server</strong>: Webpack has its own server called webpack-dev-server(WDS) which removes the pain of manually refreshing the browser once the changes have been saved.

```sh
npm i webpack-dev-server --save-dev
```

Now that we're done setting up the React app, let's run it and see if it works. To do that, we'll need to start a dev server and configure our <strong>package.json</strong>. Add the line of code below to the <strong>package.json</strong> file.


```JS
"scripts": {
    "start": "webpack-dev-server --open --hot --mode development",
    "build": "webpack --mode production"
  }
```
