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
		this.state = {
			windowSizeClassName: this.getWindowSizeClassName()
		}
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
	componentWillReceiveProps(nextProps) {
		if (this.props.ciq !== nextProps.ciq) {
			nextProps.ciq.callbacks.layout = this.props.saveLayout;
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.resizeScreenFn);
	}
	getWindowSizeClassName(){
		if(window.innerWidth > 800) {
			return "break-lg"
		} else if(window.innerWidth > 584) {
			return "break-md"
		}
		return "break-sm"
	}
	resizeScreen(){
		if(this.state.windowSizeClassName !== this.getWindowSizeClassName()) {
			this.setState({
				windowSizeClassName: this.getWindowSizeClassName()
			})
		}
	}
	render() {
		return (
			<div className={this.state.windowSizeClassName}>
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
