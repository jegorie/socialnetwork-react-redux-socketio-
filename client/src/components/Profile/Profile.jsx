import React, { useEffect, useContext } from 'react'
import Post from '../Post/Post'
import NewPost from '../Post/NewPost/NewPost'
import AvatarItem from '../AvatarItem/AvatarItem'

import { useSelector, useDispatch } from 'react-redux'
import { getMyPosts } from '../../redux/actions/getMyPosts';

import SocketContext from '../../socketContext'

import { Layout, Row, Col } from 'antd';
import style from './Profile.module.sass'

const { Content } = Layout

// user profile
const Profile = () => {
	const { firstName, lastName, photo } = useSelector(state => state.auth.user)

	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	// user posts
	const posts = useSelector(state => state.myPosts)
		.map((el, index) => (
			<Post
				key={el._id}
				post={el}
				index={index}
				firstName={firstName}
				lastName={lastName}
				photo={photo} />
		))
		.reverse()
	
	useEffect(() => {
		socket.emit('getMyPosts')
	}, [socket])

	useEffect(() => {
		socket.on('loadMyPosts', posts => {
			dispatch(getMyPosts(posts))
		})

		return () => socket.off('loadMyPosts')
	}, [dispatch, socket])

	return (
		<Content className='contentWrapper'>
			<Row>
				<Col span={7}>
					<AvatarItem size={200} shape="square" photo={photo} />
				</Col>
				<Col>
					<h1>{firstName + ' ' + lastName}</h1>
				</Col>
			</Row>
			<Row className={style.posts}>
				<Col span={17}><NewPost /></Col>
			</Row>
			{posts}
		</Content>
	)
}

export default Profile