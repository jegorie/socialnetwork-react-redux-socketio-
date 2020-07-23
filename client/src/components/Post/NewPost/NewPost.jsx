import React, { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { createNewPost } from '../../../redux/actions/createNewPost'

import SocketContext from '../../../socketContext'

import { Input, Button } from 'antd';
import style from './NewPost.module.sass'

const { TextArea } = Input;

// Create new post
const NewPost = () => {
	const [text, setText] = useState('')
	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	useEffect(() => {
		socket.on('createdNewPost', text => {
			dispatch(createNewPost(text))
		})

		return () => {
			socket.off('createdNewPost')
		}
	}, [dispatch, socket])

	const btnHandler = text => {
		socket.emit('createNewPost', text)
		setText('')
	}

	return (
		<div className={style.newPost}>
			<TextArea
				placeholder="What's new?"
				autoSize={{ minRows: 1 }}
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<Button type="primary" onClick={() => {btnHandler(text)}}>Send</Button>
		</div>
	)
}

export default NewPost
