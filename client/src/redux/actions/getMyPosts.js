import { actions } from '../actions'

export const getMyPosts = (payload) => ({
	type: actions.POST_GET,
	payload
})