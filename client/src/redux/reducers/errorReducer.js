import { actions } from '../actions'

const initialState = {
	msg: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_ERRORS:
			return {
				msg: action.payload
			}
		
		case actions.CLEAR_ERROR:
			return {
				msg: {}
			}
	
		default:
			return state;
	}
}