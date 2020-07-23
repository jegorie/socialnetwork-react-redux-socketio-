import { actions } from '../actions'

export const getRoomData = payload => ({
	type: actions.CHATROOM_DATA,
	payload
})