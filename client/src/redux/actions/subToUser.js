import { actions } from '../actions'

export const subToUser = payload => {
	switch (payload.case) {
		case 1:
			return { type: actions.USERS_FRIEND, payload }
		case 2:
			return { type: actions.USERS_SUB, payload }
		default: return null
	}
}