import React from 'react'
import AvatarItem from '../AvatarItem/AvatarItem'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/logout'

import { Layout, Popover } from 'antd';
import { DownOutlined }from '@ant-design/icons';
import style from './Header.module.sass'

const { Header: HeaderAnt } = Layout;


// Header: info about user and navigation
const Header = () => {

	const dispatch = useDispatch()

	const {firstName: name, photo} = useSelector(state => state.auth.user)

	const content = (
		<div>
			<Link to='/profile'>Home</Link>
			<br/>
			<Link to='/' onClick={() => {dispatch(logout())}}>Logout</Link>
		</div>
	)

	return (
		<HeaderAnt className={style.header}>
			<div className={style.content}>
				<div className={'logo ' + style.logo}>
					<h1>THE VSOVHOZE</h1>
				</div>
				<Popover placement="bottomRight" content={content} trigger="click">
					<div className={style.nav}>
						<h4>{name}</h4>
						<AvatarItem photo={photo}/>
						<DownOutlined />
					</div>
				</Popover>
			</div>
		</HeaderAnt>
	)
}


export default Header
