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
	render(){
		let tempStudies = [];
		let props = this.props

		Object.keys(this.props.studyList).map((key) => {
			if (this.props.studyList.hasOwnProperty(key)){
				tempStudies.push(this.props.studyList[key]);
			}
		});

		props.ciq.callbacks.studyOverlayEdit = props.toggleOverlay;
		props.ciq.callbacks.studyPanelEdit = props.openStudyModal;

		props.ciq.append('panelClose', props.syncStudies);

		return (
			<span>
				<OverlayMenu {...props} />
				<StudyModal {...props} />

				<MenuSelect hasButtons={false}
							options={tempStudies}
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
