# ChartIQ React Seed Project

## Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Questions and support](#questions-and-support)
- [Contributing to this project](#contributing-to-this-project)

## Overview

The ChartIQ React seed project is a basic build of the ChartIQ library within the React framework. The project is an example of how to implement the most common user interface elements of the library. The seed project is a good starting point for developers who want to create a UI entirely in React.

For a variety of complete charting solutions that can be easily incorporated into React applications, see the [chartiq-react-app](https://github.com/ChartIQ/chartiq-react-app) project.

## Requirements

- A copy of the ChartIQ library, version 8.1.0 or later.

  If you do not have a copy of the library, please contact your account manager or send an email to <info@cosaic.io>.

- Node.js (https://nodejs.org/). We use Node.js and npm to load the React components as well as the different libraries to transform JSX and ES6 to ES5.

## Getting started

To view the example, create a *chartiq* folder at the project root and, at a minimum, copy the ChartIQ library *js* and *css* directories to the *chartiq* folder. If you have plug-ins enabled for your license, copy the *plugins* folder also. Optionally, if you have plug-ins enabled for your license or need to use our example data or example quote feeds, copy the *examples/data* and *example/feeds* folders as well.

### Running Locally

You will need to install the project's dependencies and build the distribution file by running the following command from the project's root:
```
npm install
```

Once the node_modules have downloaded, run `npm start` and open your browser to localhost port 3000 to view the fully working example.

If port 3000 is already in use, change the port in *package.json* and *webpack.config.js*.

You can see which ports are currently being used by running `netstat -a` on any command line.

## Project structure and customization

**Note:** We do not recommend using the web components from template-advanced.html within frameworks. Unless you are familiar with integrating web components into React components, you are better off building framework components that interface with the charting library.

### React-Redux

All of the project source is in the *src* folder. The main ChartIQ charting component is in *./src/components/Chart.jsx*. This file is connected to a redux store inside of *./src/containers/chartContainer.js*. Whenever the `chartReducer` pushes a state change, the `ChartContainer` component will catch the new data and pass the `ciq` object to the UI elements so they can update according the state of the chart. When the chart container mounts, it calls a redux action that creates a new `stx` object from the charting library, and passes the `chartContainer` node to it.

```js
case Types.SET_CONTAINER:
      let ciq = new CIQ.ChartEngine({
        container: action.container
      })
      ciq.attachQuoteFeed(state.service, { refreshInterval: state.refreshInterval })
      ciq.setMarketFactory(CIQ.Market.Symbology.factory);
      // new CIQ.ExtendedHours({stx:stxx, filter:true});
      ciq.newChart(state.symbol)
      return Object.assign({}, state, {
        ciq: ciq
      })
```

If you want to manage state outside of the redux support provided out-of-the-box, the UI elements provided are available to build a UI/wrapper around your own charting node where you can create and manage a `ChartEngine` instance elsewhere.

### Components

All React components exist within the *./src/components* folder and its subfolders. These include items for configuring themes, studies, chart options, and drawings. The hierarchy of compnents can be seen by starting with *Chart.jsx* and traversing down the hierarchy. These components should be able to be reused and adapted for use in other projects.

### Quote feed

This seed project uses the ChartIQ quote simulator to view randomized data with no dependency on a paid datasource, but one can be developed and included by altering the `ciq.attachQuoteFeed(window.quoteFeedSimulator)` call in the `SET_CHART_CONTAINER` action within the `chartReducer`.  See [documentation.chartiq.com](https://documentation.chartiq.com/) for more details.

## Building for use in the browser

This project is using webpack to transform JSX and ES6 to ES5. The configs for this are in the *webpack.config.js* file.
Running `npm run build` from the command line recreates the distribution file *dist/main.js*, which is a transformed and bundled version of everything in the *src* directory; *src/index.js* automatically loads this file.

## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at https://documentation.chartiq.com.

## Contributing to this project

Contribute to this project. Fork it and send us a pull request. We'd love to see what you can do with our charting tools!
