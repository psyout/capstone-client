import React, { useState } from 'react';
import './LoginForm.scss';

function LoginForm({ onSuccess }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	// Hardcoded admin credentials
	const ADMIN_EMAIL = 'contraviento@gmail.com';
	const ADMIN_PASSWORD = 'Maxima@123';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		// Simulate API call with validation
		setTimeout(() => {
			if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
				console.log('Admin login successful');
				setIsLoading(false);
				if (typeof onSuccess === 'function') onSuccess();
			} else {
				console.log('Invalid credentials');
				setError('Invalid email or password. Access denied.');
				setIsLoading(false);
			}
		}, 1000);
	};

	return (
		<div className='admin-login-form'>
			<header className='login-header'>
				<h1>Admin Login</h1>
				<p>Access the business management dashboard</p>
			</header>

			<form onSubmit={handleSubmit}>
				{error && <div className='error-message'>{error}</div>}

				<div className='form-group'>
					<label htmlFor='username'>Email</label>
					<input
						id='username'
						type='email'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Enter your email'
						required
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Enter your password'
						required
					/>
				</div>

				<button
					type='submit'
					disabled={isLoading || !username || !password}
					className='submit-button'>
					{isLoading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>

			<div className='login-footer'>
				<p>Admin Access Only</p>
			</div>
		</div>
	);
}

export default LoginForm;
