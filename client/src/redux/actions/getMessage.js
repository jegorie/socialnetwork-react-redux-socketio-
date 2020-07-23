import { actions } from '../actions'

export const getMessage = payload => ({
	type: actions.GET_MESSAGE,
	payload
})