import { actions } from '../actions'

export const login = (payload) => ({
	type: actions.LOGIN_SUCCESS,
	payload
})