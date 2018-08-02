import React from 'react';
import PropTypes from 'prop-types';

class StudyLegend extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let studies = Object.keys(this.props.legendItems).map((key, i) => {
			let study = this.props.legendItems[key];
			let helper = new CIQ.Studies.DialogHelper({stx: this.props.ciq, sd: study})
			return (
				<span key={i} className='cq-item'>
				<span className='cq-label' onClick={this.props.updateStudy}>{key}</span>
				<div className='cq-legend-close' onClick={this.props.removeLegendItem.bind(this, helper)} />
				</span>
			);
		});
		return (
			<div className='cq-study-legend'>
				<span className='cq-heading'>Current Studies</span>
				<div className='legend-content'>
					{studies}
				</div>
				<div className='cq-placeholder'>
					<button className='ciq-btn' onClick={this.props.legendButtonAction}><span className='legend-clear-all'>Clear All</span></button>
				</div>
			</div>
		);
	}
}

export default StudyLegend;
