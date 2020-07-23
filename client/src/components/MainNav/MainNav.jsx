import React from 'react'
import { Link } from 'react-router-dom'

import { Menu, Layout } from 'antd';

const { Sider } = Layout;

const chooseNav = {
	'/profile': '1',
	'/posts': '2',
	'/messages': '3',
	'/friends': '4',
	'/im': '0',
	'/users': '0'
}

// Navigation menu
const MainNav = () => {
	const selected = chooseNav[window.location.pathname]

	return (
		<Sider theme='light'>
			<Menu theme="light" mode="inline" selectedKeys={[selected]}>
				<Menu.Item key="1">
					<Link to='/profile'>Profile</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to='/posts'>Posts</Link>
				</Menu.Item>
				<Menu.Item key="3">
					<Link to='messages'>Messages</Link>
				</Menu.Item>
				<Menu.Item key="4">
				<Link to='/friends'>Friends</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default MainNav
