import React, { useContext, useEffect } from 'react'
import InfoBar from './InfoBar/InfoBar'
import Messages from './Messages/Messages'
import InputMessage from './InputMessage/InputMessage'

import { useDispatch } from 'react-redux'
import { getRoomData } from '../../redux/actions/getRoomData'

import SocketContext from '../../socketContext'

import queryString from 'query-string'

import { Layout, Row, Col } from 'antd'

const { Content } = Layout

// Enter in Chat room
const ChatRoom = ({ location }) => {
	const { room } = queryString.parse(location.search)
	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	// recieve data
	useEffect(() => {
		socket.emit('join', room)
	}, [socket, room])

	useEffect(() => {
		socket.on("roomData", data => {
			dispatch(getRoomData(data))
		})

		return () => socket.off('roomData')
	}, [socket, dispatch])

	return (
		<Content className='contentWrapper'>
			<Row >
				<Col span={17}>
					<InfoBar />
					<Messages />
					<InputMessage />
				</Col>
			</Row>
		</Content>
	)
}

export default ChatRoom
