# Charting-Library---React-Seed-Project

This is a basic example to illustrate how to use the ChartIQ library within the React framework. 
It is not comprehensive and only intended to provide guidance on how to implement UI that interacts with the most common API calls in the [javaScript library](https://documentation.chartiq.com).
It may need to be extended to support more elaborate implementations. Feel free to contact us and request sample code and guidance on how to extend the SDK.

A full featured react application can be found at https://github.com/ChartIQ/chartiq-react-app

## Requirements

* A copy of the ChartIQ library, version 3.0+ is required. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.

* NodeJS (https://nodejs.org/). We use NodeJS and Node Package Manager (NPM) to load the React components as well as the different libraries to transform JSX and ES6 to ES5.

## Getting started

To view the example, you will need to create a 'chartiq' directory under the project root and at a minimum copy/paste the ChartIQ library `js` and `css` directories within. If you have 'plugins' enabled for your license copy that folder. Optionally if you have 'plugins' enabled for your license or need to use our 'example-data'/'example-feeds' copy those folders over as well.

### Running Locally

You will need to install the project's dependencies and build the distribution file by running the following command from the project's root:

```
npm install
```

Once the node_modules have downloaded, run ```npm start``` and open your browser window to localhost port 3000 to view the fully working example.

If port 3000 is already in use, change the port in package.json and webpack.config.js.
You can see which ports are currently being used by using ```netstat -a``` on any command line.

## Project Structure and Customization

*Note: We do not recommend using the web components from template-advanced.html within frameworks. Unless you are familiar with integrating web components into React components, you are better off building framework components that interface with the charting library.*


#### React-Redux

All of the project source is in the `src` folder. The main ChartIQ charting component is in `./src/components/Chart.jsx`. This file is connected to a redux store inside of `./src/containers/chartContainer.js`. Whenever the `chartReducer` pushes a state change, the `ChartContainer` component will catch the new data and pass the `ciq` object to the UI elements so they can update according the state of the chart. When the chart container mounts it calls a redux action which creates a new stx object from the charting library, and passes the chartContainer node to it.

```
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

If you desire to manage state outside of the redux support provided 'out-of-the-box', the UI elements provided are available to build a UI/wrapper around your own charting node where you can create and manage a ChartEngine instance elsewhere.

#### Components

All React components exist within the `./src/components` folder and its subfolders.  These include items for configuring themes, studies, chart options, and drawings.  The hierarchy of compnents can be seen by starting with `Chart.jsx` and traversing down the hierarchy.  These components should be able to be reused and adapted for use in other projects.

#### Quotefeed

This seed project uses the ChartIQ quote simulator to view randomized data with no dependency on a paid datasource, but one can be developed and included by altering the `ciq.attachQuoteFeed(window.quoteFeedSimulator)` call in the `SET_CHART_CONTAINER` action within the `chartReducer`.  See [documentation.chartiq.com](https://documentation.chartiq.com/) for more details.


## Building for use in the browser

This project is using Webpack to transform JSX and ES6 to ES5. The configs for this are in the `webpack.config.js`.
Running `npm run build` from the command line will re-create the distribution file `dist/main.js`.
This is a transformed and bundled version of everything in the src directory. `src/index.js` will automatically load this file.

## Questions and support

- Our development support team can be reached at [support@chartiq.com](mailto:support@chartiq.com).
- Our javascript documentation can be found at https://documentation.chartiq.com

## Contributing

If you see something that you think this project needs, feel free to submit a pull request. We'd love to see what it is you want to do with our charting tools! This project follows the GitFlow branching strategy, if you're not familiar with it you can read about it [here](https://nvie.com/posts/a-successful-git-branching-model/) and [here](https://danielkummer.github.io/git-flow-cheatsheet/).

First fork the project, checkout branch `develop` and work from there. Once you have tested that your projects works submit a Pull Request and we will review your work, asking for changes if necessary. Once the work has been approved we'll merge it into a release branch where it will be merged into master.
