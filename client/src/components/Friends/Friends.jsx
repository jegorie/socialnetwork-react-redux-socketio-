import React, { useEffect, useContext } from 'react'
import Friend from './Friend/Friend'
import { useSelector, useDispatch } from 'react-redux'
import { getFriends } from '../../redux/actions/getFriends'

import SocketContext from '../../socketContext'

import { Layout, Row, Col, Button } from 'antd';
import style from './Friends.module.sass'
import { Link } from 'react-router-dom';

const { Content } = Layout

// display all friends
const Friends = () => {

	const dispatch = useDispatch()
	const socket = useContext(SocketContext)
	

	// get data about existing friends
	useEffect(() => {
		socket.emit('getFriends')
	}, [socket])

	useEffect(() => {
		socket.on('sendFriends', friends => {
			dispatch(getFriends(friends))
		})

		return () => socket.off('sendFriends')
	}, [dispatch, socket])

	const friends = useSelector(state => state.friends)

	let allFriends = null

	// display it if they existing
	if (friends.length > 0) {
		allFriends = friends.map(f => (
			<Friend 
				key={f._id}
				firstName={f.firstName}
				lastName={f.lastName}
				id={f._id}
				photo={f.photo}/>
		))
	}

	return (
		<Content className='contentWrapper'>
			<Row>
				<Col span={17} className={style.friendsBar}>
					<h3>All Friends</h3>
					<Button type="primary"><Link to='/users'>Find friends</Link></Button>
				</Col>
			</Row>
			{allFriends}
		</Content>
	)
}

export default Friends