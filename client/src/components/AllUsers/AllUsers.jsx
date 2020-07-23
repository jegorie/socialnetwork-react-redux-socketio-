import React, { useEffect, useState, useContext } from 'react'
import OneUser from './OneUser/OneUser';

import { useSelector, useDispatch } from 'react-redux'
import { subToUser } from '../../redux/actions/subToUser'
import { unsubToUser } from '../../redux/actions/unsubToUser'
import { getAllUsers } from '../../redux/actions/getAllUsers';

import SocketContext from '../../socketContext'

import { Layout, Row, Col, Input } from 'antd';
import style from './AllUsers.module.sass'

const { Content } = Layout


// display all users in app
const AllUsers = () => {

	const [filter, setFilter] = useState('') // filter by name
	const users = useSelector(state => state.allUsers)
	const { _id: myId, subs: mySubs } = useSelector(state => state.auth.user) // data for OneUser.jsx
	const [filteredUsers, setFilteredUsers] = useState([])
	
	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	//get all existing users
	useEffect(() => {
		socket.emit('getAllUsers')
	}, [dispatch, socket])

	useEffect(() => {
		socket.on('sendAllUsers', users => {
			dispatch(getAllUsers(users))
		})

		return () => socket.off('sendAllUsers')
	}, [dispatch, socket])


	// sub or add in friend
	useEffect(() => {
		socket.on('subedToUser', payload => {
			dispatch(subToUser(payload))
		})
		socket.on('unsubedToUser', payload => {
			dispatch(unsubToUser(payload))
		})

		return () => {
			socket.off('subedToUser')
			socket.off('unsubedToUser')
		}
	}, [dispatch, socket])


	// filter by name in Input
	const filterUsers = name => {
		setFilter(name)
		if (name !== '') {
			const filtered = users.filter(user => {
				const fullName = user.firstName + ' ' + user.lastName
				const lc = fullName.toLowerCase()
				name = name.toLowerCase()
				return lc.includes(name)
			})
			setFilteredUsers(filtered)
		} else {
			setFilteredUsers(users)
		}
	}


	useEffect(() => {
		setFilteredUsers(users)
	}, [setFilteredUsers, users])

	// display all users if they existing
	const displayUsers = filteredUsers.map(user => (
		<OneUser
			key={user._id}
			firstName={user.firstName}
			lastName={user.lastName}
			id={user._id}
			subs={user.subs}
			friends={user.friends}
			photo={user.photo}
			myId={myId}
			mySubs={mySubs}/>
	))

	return (
		<Content className='contentWrapper'>
			<Row >
				<Col className={style.allUsersBar} span={17}>
					<h3>Find friends</h3>
				</Col>
			</Row>
			<Row>
				<Col className={style.input} span={17}>
					<Input
						value={filter}
						onChange={e => filterUsers(e.target.value)}
						placeholder='Find friends'
					/>
				</Col>
			</Row>
			{displayUsers}
		</Content>
	)
}

export default AllUsers