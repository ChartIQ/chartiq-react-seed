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

## Questions and support

- Contact our development support team at [support@chartiq.com](mailto:support@chartiq.com).
- See our SDK documentation at https://documentation.chartiq.com.

## Contributing to this project

Contribute to this project. Fork it and send us a pull request. We'd love to see what you can do with our charting tools!
