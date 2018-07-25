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
	return (dispatch, getState) => {
		let state = getState();
		let studyLookup = {};
		for(let libraryEntry in state.study.studyList){
				studyLookup[state.study.studyList[libraryEntry].name] = libraryEntry
		}
		CIQ.Studies.addStudy(ciq, studyLookup[study.name])
		return dispatch({ type: 'ADD_STUDY', ciq: ciq, study: study })
	}
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
	let hasStx = false;
            if (study.hasOwnProperty('stx')) { hasStx = true; }
            if (hasStx){
                CIQ.Studies.removeStudy(action.study.stx, action.study.sd);
            } else {
                if(state.studyHelper !== null) { CIQ.Studies.removeStudy(state.studyHelper.stx, state.studyHelper.sd); }
            }
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

export function syncStudies(){
	return (dispatch, getState) => {
		let state = getState();
		let newStudies = CIQ.clone(state.chart.ciq.layout.studies);
		return dispatch({ type: 'SYNC_STUDIES', studies: newStudies});
	}
}


