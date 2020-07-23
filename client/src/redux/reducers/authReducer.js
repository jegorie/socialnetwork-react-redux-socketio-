import { actions } from '../actions'

const initialState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	user: {
		firstName: '',
		lastName: '',
		photo: 'F'
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case actions.USER_LOADED:
		case actions.USER_LOAD:
			return {
				...state,
				isAuth: true,
				user: action.payload
			}

		case actions.LOGIN_SUCCESS:
		case actions.REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload)
			return {
				...state,
				token: action.payload,
			}

		case actions.AUTH_ERROR:
		case actions.LOGIN_FAIL:
		case actions.REGISTER_FAIL:
		case actions.LOGOUT_SUCCESS:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				user: {
					firstName: '',
					lastName: ''
				},
				isAuth: false
			}

		case actions.USERS_FRIEND:
			return {
				...state,
				user: {
					...state.user,
					friends: [
						...action.payload.user
					]
				}
			}
		
		case actions.USERS_UNSUB_FRIEND:
			return {
				...state,
				user: {
					...state.user,
					subs: [
						...state.user.subs,
						...action.payload.user
					]
				}
			}

		default: return state
	}
}