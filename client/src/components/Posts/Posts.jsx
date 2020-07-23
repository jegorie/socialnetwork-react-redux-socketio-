import React, { useEffect, useContext } from 'react'
import Post from '../Post/Post'
import { getAllPosts } from '../../redux/actions/getAllPosts'
import { useDispatch, useSelector } from 'react-redux'

import SocketContext from '../../socketContext'

import { Layout } from 'antd'

const { Content } = Layout

// display all posts the user is subscribed to
const Posts = () => {
	const {posts: allPosts, owners} = useSelector(state => state.allPosts)

	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	useEffect(() => {
		socket.emit('getAllPosts')
	}, [socket])

	useEffect(() => {
		socket.on('loadAllPosts', posts => {
			dispatch(getAllPosts(posts))
		})

		return () => socket.off('loadAllPosts')
	}, [socket, dispatch])

	let displayAllPosts = null

	// display all posts if they existing
	if (allPosts.length > 0 && owners.length > 0) {
		displayAllPosts = allPosts.map((post, index) => {
			const { firstName, lastName, photo } = owners.find(user => user._id === post.owner)
			return (
				<Post
					key={post._id}
					post={post}
					index={index}
					firstName={firstName}
					lastName={lastName}
					photo={photo}
				/>
			)
		})
		.reverse()
	}

	return (
		<Content className='contentWrapper'>
			{displayAllPosts}
		</Content>
	)
}

export default Posts