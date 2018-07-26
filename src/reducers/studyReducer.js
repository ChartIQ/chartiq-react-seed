/**
 * Studies redux reducer for actions related to studies
 * @module reducers/studyReducer
 */

import Types from '../actions/studyActions'

// initial state and schema
const initialState = {
	showStudyModal: false,
	studyLibrary: CIQ.Studies.studyLibrary,
	studyHelper: null,
	studyOverlay: {
		show: false,
		top: 0,
		left: 0
	},
	studies: {},
	excludedStudies: {}
}

/**
 * Study redux reducer
 *
 * @param {any} [state=initialState]
 * @param {any} action
 * @returns
 */
const study = (state = initialState, action) => {
	switch(action.type){
		case Types.TOGGLE_STUDY_OVERLAY:
			let flipOverlay = !state.studyOverlay.show
			return Object.assign({}, state, {
				studyOverlay: {
					show: flipOverlay,
					top: action.params.stx.cy,
					left: action.params.stx.cx
				},
				studyHelper: flipOverlay ? new CIQ.Studies.DialogHelper(action.params) : null
			})
		case Types.OPEN_STUDY_MODAL:
			let needsStudyHelper = action.params.hasOwnProperty('stx');
			return Object.assign({}, state, {
				showStudyModal: true,
				studyHelper: needsStudyHelper ? new CIQ.Studies.DialogHelper(action.params) : state.studyHelper,
				studyOverlay: {
					show: false,
					top: 0,
					left: 0
				}
			})
		case Types.CLOSE_STUDY_MODAL:
			return Object.assign({}, state, {
				showStudyModal: false,
				studyOverlay: {
					show: false,
					top: 0,
					left: 0
				},
				studyHelper: null
			})
		case Types.ADD_STUDY:
			return Object.assign({}, state, {
				studies: action.ciq.layout.studies
			});
		case Types.UPDATE_STUDY:
			state.studyHelper.updateStudy({ inputs: action.inputs, outputs: action.outputs, parameters: action.parameters });
			return Object.assign({}, state, {
				showStudyModal: false,
				studyOverlay: {
					show: false,
					top: 0,
					left: 0
				},
				studyHelper: null,
				studies: state.studyHelper.stx.layout.studies
			})
		case Types.REMOVE_STUDY:
			return Object.assign({}, state, {
				studyOverlay: {
					show: false,
					top: 0,
					left: 0
				},
				// studies: hasStx ? CIQ.clone(action.study.stx.layout.studies,{}) : CIQ.clone(state.studyHelper.stx.layout.studies,{})
				studies: Object.assign({},state.studyHelper.stx.layout.studies)
			})
		case Types.CLEAR_STUDIES:
			return Object.assign({}, state, {
				studies: {}
			});
		case Types.SYNC_STUDIES:
			return Object.assign({}, state, {
				studies: action.studies
			});
		default:
			return state
	}
}

export default study
