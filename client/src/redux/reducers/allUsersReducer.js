import { actions } from '../actions'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {

		case actions.USERS_GET:
			return [
				...action.payload
			]

		case actions.USERS_FRIEND:
		case actions.USERS_SUB:
		case actions.USERS_UNSUB:
		case actions.USERS_UNSUB_FRIEND:
			return [
				...state.map(el => {
					if (el._id === action.payload.candidate._id) {
						return action.payload.candidate
					} else {
						return el
					}
				})
			]

		default:
			return state;
	}
}