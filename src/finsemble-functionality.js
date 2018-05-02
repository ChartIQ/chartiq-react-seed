

// var Test = require('./test');
// import { ChartStore, Actions } from './stores/ChartStore';

window.onAfterChartCreated = function () {
	let stxx = window.stxx;
	// prevent white background from showing when resizing window
	FSBL.Clients.Logger.start();
	FSBL.Clients.Logger.log("Starting React Chart");
	FSBL.Clients.WindowClient.setWindowTitle(stxx.chart.symbol);
	// var appendCreateDataSet = function () {
	// 	FSBL.Clients.WindowClient.setWindowTitle(stxx.chart.symbol);
	// };
	// stxx.prototype.append("createDataSet", appendCreateDataSet);

	function setEmitters() {
		FSBL.Clients.DragAndDropClient.setEmitters({
			emitters: [
				{
					type: "symbol",
					data: getSymbol
				},
				{

					type: "chartiq.chart",
					data: getChart
				}
			]
		});
	}
	setEmitters();

	function getSymbol() {
		return {
			'symbol': stxx.chart.symbol,
			'description': 'Symbol ' + stxx.chart.symbol
		};
	}

	function getChart(cb) {
		var stx = window.stxx;
		var chart = {
			layout: stx.exportLayout(true),
			drawings: stx.serializeDrawings()
		};
		if (cb) { cb(null, chart); }
		return {
			chart: chart,
			description: 'ChartIQ Chart For ' + stx.chart.symbol
		};
	}


	FSBL.Clients.LinkerClient.subscribe("symbol", function (symbol, response) {
		if (!response.originatedHere()) {
			changeSymbol({ symbol: symbol });
		}
	});

	FSBL.Clients.DragAndDropClient.addReceivers({
		receivers: [
			{
				type: 'symbol',
				handler: function (err, response) {
					if (!err) { changeSymbol({ symbol: response.data['symbol'].symbol }); }
				}
			},
			{
				type: 'chartiq.chart',
				handler: function (err, response) {
					// if (!err) {
					// 	var chartData = response.data['chartiq.chart'].chart;
					// 	stxx.importLayout(chartData.layout);
					// 	FSBL.Clients.WindowClient.setComponentState({ field: chartData.layout.symbols[0].symbol, value: chartData.drawings }, function () {
					// 		restoreDrawings(stxx, chartData.layout.symbols[0].symbol);
					// 	});

					// }
					if (!err) {
						var chartData = response.data['chartiq.chart'].chart;
						window.actions.importLayout(chartData.layout);
						FSBL.Clients.WindowClient.setComponentState({ field: chartData.layout.symbols[0].symbol, value: chartData.drawings }, function () {
							window.actions.importDrawings();
						});
					}
				}
			}
		]
	});
	// stxx.callbacks.layout = saveLayout;
	// stxx.callbacks.symbolChange = saveLayout;
	// stxx.callbacks.drawing=saveDrawings;

	// setTimeout(Actions.updateChartContainerSize, 100);
};
// ChartStore.originalSetChart = ChartStore.setChart;

window.restoreDrawings = function (stx, symbol) {
	FSBL.Clients.WindowClient.getComponentState({ field: symbol }, function (err, memory) {
		if (memory) {
			stx.importDrawings(memory);
			window.actions.draw();
		}
	});
};
window.saveDrawings = function (obj) {
	var tmp = obj.stx.exportDrawings();
	if (tmp.length === 0) {
		FSBL.Clients.WindowClient.setComponentState({ field: obj.symbol, value: null});
	} else {
		FSBL.Clients.WindowClient.setComponentState({ field: obj.symbol, value: JSON.stringify(tmp) });
	}
};

window.restoreLayout = function (stx, cb) {
	if (typeof cb === 'undefined') { cb = function noop() { }; }
	function closure() {
		restoreDrawings(stx, stx.chart.symbol);
		cb();
	}
	var opts = FSBL.Clients.WindowClient.options;
	FSBL.Clients.WindowClient.getComponentState({ field: 'myChartLayout' }, function (err, state) {
		if (state === null || typeof state == 'undefined') {
			if (opts.customData &&
				opts.customData.spawnData &&
				opts.customData.spawnData.layout) {
				state = opts.customData.spawnData.layout;
				opts.customData.spawnData.layout = null;
				//so it doesn't overwrite what's in storage the next time the app is loaded.
			} else {
				FSBL.Clients.WindowClient.setWindowTitle(stx.symbol);
				// stx.layout.symbols = [{ symbol: 'AAPL' }];
				// stx.importLayout(stx.layout, { managePeriodicity: true, cb: closure });
				window.actions.importLayout(stx.layout, closure);
				return;
			}
		}
		//
		// stx.importLayout(state, { managePeriodicity: true, cb: closure });
		window.actions.importLayout(state, closure);
	});
};


// ChartStore.setChart = function (chart) {
// 	let stx = window.stxx;
// 	function closure() {
// 		// ChartStore.originalSetChart(chart);
// 		window.actions.importLayout(chart.layout);
// 		window.actions.importDrawings(chart.drawings || []);
// 		window.actions.draw();
// 	}
// 	if (chart.layout.span && Object.keys(chart.layout.span).length == 0) { chart.layout.span = null; }
// 	//@TODO remove this line below once library is updated
// };

window.saveLayout = function (obj) {
	var s = obj.stx.exportLayout(true);
	FSBL.Clients.WindowClient.setComponentState({ field: 'myChartLayout', value: s });
};

window.changeSymbol = function (data) {
	var stxx = window.stxx;

	// Actions.showLoader();
	// data.symbol = data.symbol.toUpperCase(); // set a pretty display version
	// //FSBL.LinkerClient.publish("symbol", data.symbol);
	// var self = this;
	// stxx.newChart(data, null, null, function (err) {
	// 	if (err) {
	// 		//TODO, symbol not found error
	// 		Actions.hideLoader();
	// 		return;

	// 	}
	// 	// The user has changed the symbol, populate UITitle with yesterday's closing cq-hu-price
	// 	// iqPrevClose is just a dummy value, you'll need to get the real value from your data source

	// 	for (var field in stxx.chart.series) { stxx.removeSeries(field); } // reset comparisons - remove this line to transfer from symbol to symbol.
	// 	if (stxx.tfc) { stxx.tfc.changeSymbol(); }   // Update trade from chart, todo, do this with an observer
	// 	Actions.hideLoader();
		// restoreDrawings(stxx, stxx.chart.symbol);
	// });
	// FSBL.Clients.WindowClient.setWindowTitle(data.symbol.toUpperCase());
	fin.desktop.InterApplicationBus.publish('fts.navigate.entityBySymbol', { symbol: data.symbol.toUpperCase() });
	FSBL.Clients.WindowClient.setWindowTitle(data.symbol.toUpperCase());
	window.actions.setSymbolAndSave(data.symbol.toUpperCase(), false);
};

fin.desktop.InterApplicationBus.subscribe("*", "fts.entity.active", (message) => {
	let symbol = message.symbol;
	changeSymbol({ symbol: symbol });
}, (e => (console.log(e))));

// Actions.setSymbol = function (symbol) {
// 	let stxx = ChartStore.getChart();
// 	if (!stxx) { return; }
// 	symbol = symbol.toUpperCase();
// 	changeSymbol({ symbol });
// 	FSBL.Clients.LinkerClient.publish({ dataType: "symbol", data: symbol });
// 	fin.desktop.InterApplicationBus.publish('fts.navigate.entityBySymbol', { symbol: symbol });
// 	ChartStore.emit('symbolChange');
// };