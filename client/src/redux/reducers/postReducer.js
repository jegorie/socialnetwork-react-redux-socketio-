import { actions } from '../actions'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {

		case actions.POST_GET:
			return [
				...action.payload
			]

		case actions.POST_CREATED:
			return [
				...state,
				action.payload
			]
		
		case actions.POST_DELETE:
			return state.filter((el) =>(
				el._id !== action.id
			))

		default:
			return state;
	}
}