import React, { useEffect, useContext } from 'react'
import OneChatRoom from './OneChatRoom/OneChatRoom'

import { useSelector, useDispatch } from 'react-redux'
import { getFriends } from '../../redux/actions/getFriends';
import { getChatRooms } from '../../redux/actions/getChatRooms'

import SocketContext from '../../socketContext'

import { Layout } from 'antd';

const { Content } = Layout


// Display all existing chat rooms
const AllChatRooms = () => {
	const allChatRooms = useSelector(state => state.allChatRooms)
	const friends = useSelector(state => state.friends)
	const socket = useContext(SocketContext)
	const dispatch = useDispatch()


	// send request to get data
	useEffect(() => {
		socket.emit('getAllChatRooms')
		socket.emit('getFriends')
	}, [socket])

	// Get info about all chatRooms and Friends data from server
	useEffect(() => {
		socket.on('sendAllChatRooms', rooms => {
			dispatch(getChatRooms(rooms))
		})

		socket.on('sendFriends', friends => {
			dispatch(getFriends(friends))
		})

		return () => {
			socket.off('sendAllChatRooms')
			socket.off('sendFriends')
		}
	}, [socket, dispatch])

	let displayAllChatRooms = null


	// if we recieved some data - display it
	if (allChatRooms.length > 0 && friends.length > 0) {
		displayAllChatRooms = allChatRooms.map(room => {
			const { firstName, lastName, photo } = friends.find(f => room.users.includes(f._id))
			return (
				<OneChatRoom
					key={room._id}
					firstName={firstName}
					lastName={lastName}
					room={room._id}
					photo={photo}
				/>
			)
		})
	}

	return (
		<Content className='contentWrapper'>
			{displayAllChatRooms}
		</Content>
	)
}

export default AllChatRooms