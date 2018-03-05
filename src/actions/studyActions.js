import createTypes from 'redux-create-action-types';
import _ from 'lodash';

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

/*
 * action creators
 */

export function setStudyHelper(helper){
    return { type: 'SET_STUDY_HELPER', helper: helper }
}

export function toggleOverlay(params){
    return { type: 'TOGGLE_STUDY_OVERLAY', params: params }
}

export function openStudyModal(params){
    return { type: 'OPEN_STUDY_MODAL', params: params }
}

export function closeStudyModal(){
    return { type: 'CLOSE_STUDY_MODAL' }
}

export function addStudy(ciq, study){
    return { type: 'ADD_STUDY', ciq: ciq, study: study }
}

export function updateStudy(inputs, outputs, parameters){
    return { type: 'UPDATE_STUDY', inputs: inputs, outputs: outputs, parameters: parameters }
}

export function removeStudy(study){
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
        let newStudies = _.cloneDeep(state.chart.ciq.layout.studies);
        return dispatch({ type: 'SYNC_STUDIES', studies: newStudies});
    }
}