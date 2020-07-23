import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/login'

import SocketContext from '../../socketContext'

import { Typography, Form, Input, Button } from "antd"

const { Title } = Typography;

// styles
const layout = {
	labelCol: { span: 0 },
	wrapperCol: { span: 24 },
};
const tailLayout = {
	wrapperCol: { offset: 0, span: 24 },
};

// Login page
const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()
	const socket = useContext(SocketContext)

	// if success authenticated, get data about user
	useEffect(() => {
		socket.on('authSuccess', token => {
			dispatch(login(token))
			socket.emit('getUser', token)
		})

		return () => {
			socket.off('authSuccess')
		}
	}, [socket, dispatch])

	// send request to get data about authenticates
	const onLoginClick = () => {
		socket.emit('login', { email, password }, err => {
			alert(err)
		})
	}

	return (
		<div className='authWrapper'>
			<Title>Welcome!</Title>
			<Form {...layout} name='basic' initialValues={{ remember: true }}>
				<Form.Item
					name='email'
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						placeholder='E-mail'
					/>
				</Form.Item>

				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button
						type='primary'
						htmlType='submit'
						onClick={onLoginClick}
					>
						Login
					</Button>
				</Form.Item>

				<Form.Item {...tailLayout}>
					{"Don't have accout? "}
					<Link to='/register'>Regsiter now</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
