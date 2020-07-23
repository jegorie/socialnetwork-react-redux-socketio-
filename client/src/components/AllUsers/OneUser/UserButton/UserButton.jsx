import React, { useContext } from 'react'
import { Popover, Button } from 'antd'
import SocketContext from '../../../../socketContext'

const UserButton = ({ id, subs, friends, myId, mySubs }) => {

	const socket = useContext(SocketContext)

	const subscribe = () => {
		socket.emit('subToUser', id)
	}

	const unsubscribe = () => {
		socket.emit('unsubToUser', id)
	}

	const content = (value) => (
		<div>
			<Button onClick={unsubscribe}>{value}</Button>
		</div>
	)
	
	console.log(mySubs.includes(id))
	// change button if user is friend, your sub or just user
	if (subs.includes(myId)) {
		return (
			<Popover placement="bottomLeft" content={content('Unsubscribe')}>
				<Button type="link" >Subscribed</Button>
			</Popover>)
	} else if (friends.includes(myId)) {
		return (
			<Popover placement="bottomLeft" content={content('Delete')}>
				<Button type="link" >Your friend</Button>
			</Popover>)
	} else if (mySubs.includes(id)) {
		return <Button type="link" onClick={subscribe}>Add to friends</Button>
	} else {
		return <Button type="link" onClick={subscribe}>Subscribe</Button>
	}
}

export default UserButton
