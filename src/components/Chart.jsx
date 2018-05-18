import React from 'react'
import UI from "./UI";
import RangeSelector from "./RangeSelector";
import ShareButton from "./ShareButton";
import Legend from './Legend';
import DrawingContainer from '../containers/drawingContainer'

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setChartContainer($$$('#chartContainer'), {
			studyOverlayEdit: this.props.toggleStudyOverlay,
			studyPanelEdit: this.props.openStudyModal
		})
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

			if (window.onAfterChartCreated) FSBL.addEventListener('onReady', () => {
				window.onAfterChartCreated();
				window.restoreLayout(this.props.ciq);
			});
		}
	}
	render() {
		return (
			<div>
				<UI {...this.props} />
				<div className="ciq-chart-area">
					<DrawingContainer {...this.props} />
					<div id='chartContainer' className='chartContainer chartContainerMain'>
						<div className={this.props.isLoadingPeriodicity ? 'loader' : ''}></div>
						<Legend {...this.props} />
					</div>
				</div>
				<div className="ciq-footer">
					<ShareButton {...this.props} />
					<RangeSelector {...this.props} />
				</div>
			</div>
		);
	}
}

export default Chart