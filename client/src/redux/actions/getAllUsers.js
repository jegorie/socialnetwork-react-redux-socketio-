import { actions } from '../actions'

export const getAllUsers = payload => ({
	type: actions.USERS_GET,
	payload
})