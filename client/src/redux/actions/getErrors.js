import { actions } from '../actions'

export const getErrors = (payload) => ({
	type: actions.GET_ERRORS,
	payload
})