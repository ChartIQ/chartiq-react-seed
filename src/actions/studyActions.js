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
    'REMOVE_STUDY'
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
    return { type: 'ADD_STUDY', ciq: ciq, study: study }
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
    return { type: 'UPDATE_STUDY', inputs: inputs, outputs: outputs, parameters: parameters }
}

/**
 * Remove study from chart
 *
 * @export
 * @param {String} study name of study
 * @returns
 */
export function removeStudy(study){
    return { type: 'REMOVE_STUDY', study: study }
}
