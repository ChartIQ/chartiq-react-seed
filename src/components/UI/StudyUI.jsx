/**
 * StudyUI for adding studies to the chart
 * @module components/UI/StudyUI
 */

import React from 'react'
import OverlayMenu from './OverlayMenu';
import StudyModal from '../Modals/StudyModal/StudyModal';
import MenuSelect from '../shared/MenuSelect'

/**
 * StudyUI for adding studies to the chart
 *
 * @class StudyUI
 * @extends {React.Component}
 */
class StudyUI extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.syncStudies.bind(this, this.props)
		this.props.syncStudies(this.props)
	}

	render(){
		let alphabetized = [];
		let props = this.props

		Object.keys(this.props.studyLibrary).map((key) => {
			if (this.props.studyLibrary.hasOwnProperty(key)){
				alphabetized.push(this.props.studyLibrary[key]);
			}
		});

		alphabetized.sort((a, b) => {
		 	if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
		 	else if (b.name.toLowerCase() > a.name.toLowerCase()) { return -1; }
		 	else { return 0; }
		 });

		props.ciq.callbacks.studyOverlayEdit = props.toggleOverlay;
		props.ciq.callbacks.studyPanelEdit = props.openStudyModal;

		return (
			<span>
				<OverlayMenu {...props} />
				<StudyModal {...props} />

				<MenuSelect hasButtons={false}
							options={alphabetized}
							keyName='study'
							name='name'
							handleOptionSelect={props.addStudy}
							needsCiq={true}
							ciq={props.ciq}
							menuId='studySelect'
							title='Studies'
							hasLegend={Object.keys(props.studies).length !== 0 ? true : false}
							legendItems={props.studies}
							legendButtonAction={props.removeAllStudies}
							removeLegendItem={props.removeStudy}
							editLegendItem={props.openStudyModal} />
			</span>
		);
	}
};

export default StudyUI
