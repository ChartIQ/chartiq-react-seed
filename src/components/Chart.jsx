/**
 * Main chart react container
 * @module components/Chart
 */

import React from 'react'
import UI from "./UI";
import RangeSelector from "./RangeSelector";
import Legend from './Legend';
import DrawingContainer from '../containers/drawingContainer'

export const ChartResponsiveSize = Object.freeze({
	SMALL: "break-sm",
	MEDIUM: "break-md",
	LARGE: "break-lg"
});

export var calculateResponsiveSize = function() {
	if(window.innerWidth > 800) {
		return ChartResponsiveSize.LARGE
	} else if(window.innerWidth > 584) {
		return ChartResponsiveSize.MEDIUM
	}
	return ChartResponsiveSize.SMALL
}

/**
 * Main chart react container component
 *
 * @class Chart
 * @extends {React.Component}
 */
class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setChartContainer($$$('#chartContainer'), {
			studyOverlayEdit: this.props.toggleStudyOverlay,
			studyPanelEdit: this.props.openStudyModal
		})
		this.resizeScreenFn = this.resizeScreen.bind(this)
		window.addEventListener("resize", this.resizeScreenFn);
		this.resizeScreenFn();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.ciq === null) {
			//Finsemble hacks
			let actions = {};

			actions.importLayout = (stx, cb) => {
				this.props.importLayout(stx, cb);
			};

			actions.setSymbolAndSave = (symbol) => {
				this.props.setSymbolAndSave(symbol);
			};

			actions.importDrawings = (memory) => {
				this.props.importDrawings(memory);
			};

			window.actions = actions;
			window.stxx = this.props.ciq;

			nextProps.ciq.callbacks.symbolChange = this.updateComparisonSeries.bind(this);
			nextProps.ciq.callbacks.layout = this.props.layoutChanged;
			nextProps.ciq.addEventListener('undoStamp', nextProps.undoStamps);
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeScreenFn);
	}
	resizeScreen(){
		let responsiveSize = calculateResponsiveSize()
		if(this.props.responsiveSize !== responsiveSize) {
			this.props.setResponsiveSize(responsiveSize)
		}
	}
	updateComparisonSeries() {
		if (arguments[0].action == 'remove-series') {
			let stx = arguments[0]
			this.props.removeComparisonAndSave(stx.symbol)
			if (window.onAfterChartCreated) FSBL.addEventListener('onReady', () => {
				window.onAfterChartCreated();
				window.restoreLayout(this.props.ciq);
			});
		}
  }
	render() {
		return (
			<div className={this.props.responsiveSize}>
				<UI {...this.props} />
				<div className="ciq-chart-area">
					<DrawingContainer {...this.props} />
					<div id='chartContainer' className='chartContainer chartContainerMain'>
						<div className={this.props.isLoadingPeriodicity ? 'loader' : ''}></div>
						<div className="chart-title">{this.props.symbol}</div>
						<Legend {...this.props} />
					</div>
				</div>
				<div className="ciq-footer">
					<div className="ciq-share-button" onClick={()=>this.props.setShareStatus("SHOW")}>Share</div>
					<RangeSelector {...this.props} />
				</div>
			</div>
		);
	}
}

export default Chart
