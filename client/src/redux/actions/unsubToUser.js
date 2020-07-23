import { actions } from '../actions'

export const unsubToUser = payload => {
	switch(payload.case) {
		case 1:
			return { type: actions.USERS_UNSUB, payload }

		case 2:
			return { type: actions.USERS_UNSUB_FRIEND, payload }

		default:
			return null
	}
}