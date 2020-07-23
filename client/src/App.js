import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import SocketContext from './socketContext'
import { actions } from './redux/actions'
import { loadUser } from './redux/actions/loadUser'

import useRouters from './routes/routes'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.sass'

let socket = null;

const App = () => {
	const ENDPOINT = 'localhost:8080' // connection to server socket io
	const dispatch = useDispatch()
	const token = useSelector(state => state.auth.token)

	// coonnect to server via socket io
	useEffect(() => {
		socket = io(ENDPOINT, {
			query: 'token=' + token
		})
	}, [ENDPOINT, token])

	// load user after authenticate
	useEffect(() => {
		socket.on('loadUser', user => {
			dispatch(loadUser(user))
		})

		socket.on('authFail', () => {
			dispatch({ type: actions.AUTH_ERROR })
		})

		return () => {
			socket.off('loadUser')
			socket.off('authFail')
		}
	}, [dispatch])

	// if authenticated load main logic
	const isAuth = useSelector(state => state.auth.isAuth)
	const routes = useRouters(isAuth)
	return (
			<SocketContext.Provider value={socket}>
				<Router>
					{routes}
				</Router>
			</SocketContext.Provider>
	)
}

export default App
