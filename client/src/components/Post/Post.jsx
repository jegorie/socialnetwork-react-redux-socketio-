import React, { useContext, useEffect } from 'react'
import AvatarItem from '../AvatarItem/AvatarItem'

import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/deletePost'
import moment from 'moment'

import SocketContext from '../../socketContext'

import { Comment, Col, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import style from './Post.module.sass'

// post component
const Post = ({post, firstName, lastName, photo}) => {
	const { text, date, _id: id } = post
	const fullName = firstName + ' ' + lastName
	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	// delete post
	useEffect(() => {
		socket.on('deletedPost', postId => {
			if (postId === id)
				dispatch(deletePost(postId))
		})

		return () => {
			socket.off('deltedPost')
		}
	})

	const deleteHandler = () => {
		socket.emit('deletePost', id)
	}

	return (
		<Row>
			<Col span={17} className={style.post}>
				<Comment
					author={fullName}
					avatar={
						<AvatarItem photo={photo}/>
					}
					content={
						<p>{text}</p>
					}
					datetime={
						<span>{moment(date).format('LLL')}</span>
					}
				/>
				<CloseOutlined
					className={style.delete}
					onClick={() => deleteHandler()}
				/>
			</Col>
		</Row>
	)
}

export default Post
