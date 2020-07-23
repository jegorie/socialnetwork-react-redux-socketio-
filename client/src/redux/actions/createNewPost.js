import { actions } from '../actions'

export const createNewPost = (payload) => ({
	type: actions.POST_CREATED,
	payload
})