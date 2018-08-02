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

	checkStudyLibrary (studyName) {
		return CIQ.Studies.studyLibrary[studyName].name || studyName;
	}

	render(){
		let props = this.props
		let alphabetized = Object.keys(props.studyLibrary)

		// var entries = Object.values(props.studyLibrary)
		// Object.keys(props.studyLibrary).map((key, val) => {
		// 	var entry = {}

		// 	alphabetized.push(entry[props.studyLibrary[key]] = entries[val]);
		// });

		alphabetized.sort((a, b) => {
		 	if (a.toLowerCase() > b.toLowerCase()) { return 1; }
		 	else if (b.toLowerCase() > a.toLowerCase()) { return -1; }
		 	else { return 0; }
		 });

		props.ciq.callbacks.studyOverlayEdit = props.toggleOverlay;
		props.ciq.callbacks.studyPanelEdit = props.openStudyModal;

		return (
			<React.Fragment>
				<OverlayMenu {...props} />
				<StudyModal {...props} />

				<MenuSelect hasButtons={false}
							options={alphabetized}
							keyName='study'
							handleOptionSelect={props.addStudy}
							needsCiq={true}
							ciq={props.ciq}
							menuId='studySelect'
							title='Studies'
							hasLegend={Object.keys(props.studies).length !== 0 ? true : false}
							labelNeedsTransform={true}
							labelTransform={this.checkStudyLibrary}
							legendItems={props.studies}
							legendButtonAction={props.removeAllStudies}
							removeLegendItem={props.removeStudy}
							editLegendItem={props.openStudyModal} />
			</React.Fragment>
		);
	}
};

export default StudyUI
