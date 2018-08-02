/**
 * Drawing actions for redux actions involved with the studies on the chart
 * @module actions/studyActions
 */

import createTypes from 'redux-create-action-types'

/*
 * action types
 */
const Types = createTypes(
	'SET_STUDY_HELPER',
	'OPEN_STUDY_MODAL',
	'CLOSE_STUDY_MODAL',
	'TOGGLE_STUDY_OVERLAY',
	'ADD_STUDY',
	'UPDATE_STUDY',
	'REMOVE_STUDY',
	'CLEAR_STUDIES',
	'SYNC_STUDIES'
)

export default Types

/**
 * Assign the study helper to the charting engine
 *
 * @export
 * @param {any} helper
 * @returns
 */
export function setStudyHelper(helper){
	return { type: 'SET_STUDY_HELPER', helper: helper }
}

/**
 * Show or hide the study overlay
 *
 * @export
 * @param {any} params
 * @returns
 */
export function toggleOverlay(params){
	return { type: 'TOGGLE_STUDY_OVERLAY', params: params }
}

/**
 * Open study configuration window
 *
 * @export
 * @param {any} params
 * @returns
 */
export function openStudyModal(params){
	return { type: 'OPEN_STUDY_MODAL', params: params }
}

/**
 * Close study configuration window
 *
 * @export
 * @returns
 */
export function closeStudyModal(){
	return { type: 'CLOSE_STUDY_MODAL' }
}

/**
 * Adds a study to the chart
 *
 * @export
 * @param {CIQ.ChartEngine} ciq
 * @param {String} study
 * @returns
 */
export function addStudy(ciq, study){
	var sd = CIQ.Studies.addStudy(ciq, study)
	var helper = new CIQ.Studies.DialogHelper({stx: ciq, sd:sd})
	return { type: 'ADD_STUDY', ciq: ciq, study: study, studyHelper: helper, sd: sd}
}

/**
 * Update study configuration
 *
 * @export
 * @param {any} inputs
 * @param {any} outputs
 * @param {any} parameters
 * @returns
 */
export function updateStudy(inputs, outputs, parameters){
	return (dispatch, getState) => {
		let state = getState();
		if(state.study.studyHelper !== null) {
			state.study.studyHelper.updateStudy({ inputs: inputs, outputs: outputs, parameters: parameters });
		}
	return dispatch({ type: 'UPDATE_STUDY', inputs: inputs, outputs: outputs, parameters: parameters })
	}
}

/**
 * Remove study from chart
 *
 * @export
 * @param {String} study name of study
 * @returns
 */
export function removeStudy(study){
	CIQ.Studies.removeStudy(study.stx, study.sd);
	return { type: 'REMOVE_STUDY', study: study }
}

export function removeAllStudies(){
	return (dispatch, getState) => {
		let state = getState();
		for (var id in state.chart.ciq.layout.studies){
			let sd = state.chart.ciq.layout.studies[id];
			if (!sd.customLegend) { CIQ.Studies.removeStudy(state.chart.ciq, sd); }
		}
		state.chart.ciq.draw();
		return dispatch(clearStudies())
	}
}

export function clearStudies(){
	return { type: 'CLEAR_STUDIES' }
}

export function syncStudies(prps){
	var newStudies = Object.assign({},prps.ciq.layout.studies);
	return { type: 'SYNC_STUDIES', studies: newStudies};
}


