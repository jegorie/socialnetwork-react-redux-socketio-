import { actions } from '../actions'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {

		case actions.FRIENDS_GET:
			if (Array.isArray(action.payload)) {
				return [...action.payload]
			}
			return [{...action.payload}]

		default:
			return state;
	}
}