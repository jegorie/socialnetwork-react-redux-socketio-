import React from 'react'
import AvatarItem from '../../AvatarItem/AvatarItem'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './InfoBar.module.sass'

import { Button } from 'antd'


// info about user
const InfoBar = () => {
	const myId = useSelector(state => state.auth.user._id)
	const friend = useSelector(state => (
		state.chatRoom.users.filter(user => user._id !== myId)
	))

	let name = null
	let photo = null

	if (friend.length > 0) {
		name = friend[0].firstName
		photo = friend[0].photo
	}


	return (
		<div className={style.header}>
			<Link to='/messages'><Button>Back</Button></Link>
			<div><h3>{name}</h3></div>
			<AvatarItem photo={photo}/>
		</div>
	)
}

export default InfoBar
