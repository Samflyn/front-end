# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Radium is a package used for using inline styles and media queries

### To enable CSS Modules

For react-scripts v1

run npm eject to get the under the hood config of webpack

in webpack.config for both prod and dev add this after test:/\.css$/ in options

options:{
importLoaders:1,
modules:true,
localIdentName:'[name]**[local]**[hash:base64:5]'
}

For react-scripts v2 or higher

rename css files to name.module.css and import classes from './App.module.css'

This will automatically enable CSS modules

### To restrict the no and types of props that can be passed to component

use prop-types

npm install --save prop-types

### React Router

We installed both react-router and react-router-dom . Technically, only react-router-dom is required for web development. It wraps react-router and therefore uses it as a dependency.

We don't need to install react-router on our own for it to work. You can omit this installation step, I left it in there for historic reasons and because I like to emphasize that the main package is named react-router. If you ever search for assistance, you probably want to search for "react router" - that's the name of the package.

### Redux Thunk

Since we cannot use async functions for editing store we use a third party package as middleware

### Testing

For testing we need jest, enzyme react-test-renderer enzyme-adapter-react-17

### Webpack

A bundler which also optimizes files and also transpile js to older versions.

It combines multiple js or css into bundled files.

To install babel -> npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-stage-2 babel-loader @babel/plugin-proposal-class-properties

For css loaders use -> npm install --save-dev style-loader css-loader postcss-loader autoprefixer

postcss-loader is used to transform the css to make it work with older browsers

If you need to support these browsers, you need to add a polyfill (a package which provides these features for older browsers).

The Babel docs explain how you can take advantage of Babel's built-in "Polyfill auto injecting" feature: https://babeljs.io/docs/en/babel-polyfill

Simply install two packages:

npm install --save core-js

and

npm install --save regenerator-runtime 

Change the config of your @babel/preset-env  babel preset in the .babelrc  file: 

"presets": [
    ["@babel/preset-env", {
        "targets": {
            "browsers": [
                "> 1%",
                "last 2 versions"
            ]
        },
        "useBuiltIns": "usage"
     }],
    ...
 ],

To load images in code and use it as url

npm install --save-dev url-loader file-loader

To inject scripts in html

npm install --save-dev html-webpack-plugin

### CSS Animations

React will not wait for the css animations to complete before removing the element from DOM

use react-transaction-group for css transitions

import Transition from 'react-transition-group/Transition'

and wrap the element that has transition

'in' in Transition determines if the element should be rendered

Or alternative react motion

### Take a look at Relay + GraphQL