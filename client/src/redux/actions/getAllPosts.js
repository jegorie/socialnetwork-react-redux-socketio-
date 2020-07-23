import { actions } from '../actions'

export const getAllPosts = payload => ({
	type: actions.ALL_POSTS_GET,
	payload
})