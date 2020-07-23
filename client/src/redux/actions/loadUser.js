import { actions } from '../actions'

export const loadUser = (payload) => ({
	type: actions.USER_LOAD,
	payload
})
