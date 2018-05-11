/**
 * Main chart react container
 * @module components/Chart
 */

import React from 'react'
import UI from "./UI";
import RangeSelector from "./RangeSelector";
import Legend from './Legend';
import DrawingContainer from '../containers/drawingContainer'

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
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.ciq !== nextProps.ciq) {
			nextProps.ciq.callbacks.layout = this.props.saveLayout;
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
					<div className="ciq-share-button" onClick={()=>props.setShareStatus("SHOW")}>Share</div>
					<RangeSelector {...this.props} />
				</div>
			</div>
		);
	}
}

export default Chart
