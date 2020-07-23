import { actions } from '../actions'

export const getFriends = payload => ({
	type: actions.FRIENDS_GET,
	payload
})
