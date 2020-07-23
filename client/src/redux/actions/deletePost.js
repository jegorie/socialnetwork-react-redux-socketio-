import { actions } from '../actions'

export const deletePost = (id) => ({
	type: actions.POST_DELETE,
	id
})