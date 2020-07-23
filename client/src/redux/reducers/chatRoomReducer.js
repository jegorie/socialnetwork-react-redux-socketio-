import { actions } from '../actions'

const initialState = { users: [], messages: [], roomId: ''}

export default (state = initialState, action) => {
	switch (action.type) {

		case actions.CHATROOM_DATA:
			return { ...action.payload }

		case actions.GET_MESSAGE:
			return {
				...state,
				messages: [
					...state.messages,
					action.payload
				]
			}

		default:
			return state;
	}
}