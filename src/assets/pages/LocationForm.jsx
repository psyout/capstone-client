import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginPage() {
	const navigate = useNavigate();
	const handleSuccess = () => navigate('/add-location');
	return (
		<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
			<LoginForm onSuccess={handleSuccess} />
		</div>
	);
}

export default LoginPage;
