import { actions } from '../actions'

const initialState = {
	posts: [],
	owners: []
}

export default (state = initialState, action) => {
	switch (action.type) {

		case actions.ALL_POSTS_GET:
			return {
				...action.payload
			}

		default:
			return state;
	}
}