import { actions } from '../actions'

export const getChatRooms = payload => ({
	type: actions.GET_CHATROOMS,
	payload
})