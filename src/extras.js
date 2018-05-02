require.config({
	baseUrl: 'chartiq/js'
});

// Define the AMD module for the library
// ['chartiq'] refers to chartiq.js in the ChartIQ library. Requiring this file kicks off require.js and grabs everything that is needed from the library.
define('chartIQ', ['chartiq'], function(chartiq) {
	for (var key in chartiq) {
		window[key] = chartiq[key];
	}
	return chartiq;
});


require(['chartIQ'], function() {
	require(["./dist/main.js"], function() {})
});

