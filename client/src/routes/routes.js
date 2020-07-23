import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Login = React.lazy(() => import('../components/Login/Login'))
const Register = React.lazy(() => import('../components/Register/Register'))
const Authenticated = React.lazy(() => import('../routes/Authenticated'))

const useRouters = (isAuthenticated) => {
	if (isAuthenticated === null) {
		return null
	}
	if (isAuthenticated === true) {
		return (
			<Suspense fallback={<div></div>}>
				<Authenticated />
			</Suspense>
		)
	} else {
		return (
			<Suspense fallback={<div></div>}>
				<Switch>
					<Route path='/' exact>
						<Login />
					</Route>
					<Route path='/register' exact>
						<Register />
					</Route>
					<Redirect to='/'/>
				</Switch>
			</Suspense>
		)
	}
}

export default useRouters