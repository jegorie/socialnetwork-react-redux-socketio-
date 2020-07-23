import React, { useEffect, useContext, Suspense } from 'react'

import { getMessage } from '../redux/actions/getMessage'

import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import SocketContext from '../socketContext'

import { notification, Layout } from 'antd'
import Header from '../components/Header/Header'
import MainNav from '../components/MainNav/MainNav'

const { Content } = Layout

const Profile = React.lazy(() => import('../components/Profile/Profile'))
const Posts = React.lazy(() => import('../components/Posts/Posts'))
const Friends = React.lazy(() => import('../components/Friends/Friends'))
const AllUsers = React.lazy(() => import('../components/AllUsers/AllUsers'))
const ChatRoom = React.lazy(() => import('../components/ChatRoom/ChatRoom'))
const AllChatRooms = React.lazy(() => import('../components/AllChatRooms/AllChatRooms'))

// notification for message
const openNotification = (description, message) => {
	notification.info({
		message,
		description,
		placement: 'bottomRight',
	});
};

// After authenticate load this component
const Authenticated = () => {

	const dispatch = useDispatch()
	const socket = useContext(SocketContext)
	const { pathname } = useLocation()

	// message for chatroom or notification
	useEffect(() => {
		socket.on('message', data => {
			if (!(/im/gi).test(pathname)) {
				openNotification(data.message.text, data.notification)
			} else {
				dispatch(getMessage(data.message))
			}
		})

		return () => socket.off('message')
	})

	return (
		<Layout>
			<Header />
			<Layout className='appWrapper'>
				<MainNav selected={'1'}/>
					<Suspense fallback={<Content className='contentWrapper'></Content>}>
						<Switch>
							<Route path='/profile' component={Profile} />
							<Route path='/posts' component={Posts} />
							<Route path='/messages' component={AllChatRooms} />
							<Route path='/friends' component={Friends} />
							<Route path='/users' component={AllUsers} />
							<Route path='/im' component={ChatRoom} />
							<Redirect to='/profile' />
						</Switch>
					</Suspense>
			</Layout>
		</Layout>
	)
}

export default Authenticated
