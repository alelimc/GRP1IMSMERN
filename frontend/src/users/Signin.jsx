import React, { useState } from 'react';
import { signin } from '../lib/api-auth';
import auth from '../lib/auth-helper';
import { useNavigate } from 'react-router-dom';

const SigninForm = ({ onSignupLinkClick }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignupClicked, setIsSignupClicked] = useState(false); // Nuevo estado para controlar si se ha hecho clic en "Sign up"


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignupClick = () => {
        setIsSignupClicked(true);
        navigate('/signup')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            const response = await signin({ email, password });

            if (!response) {
                throw new Error('Failed to signin');
            }
            
            const { token, user } = response;


            auth.authenticate(token, user, () => {
                const admin = auth.isAdmin();
                if (!admin){
                    console.log('User authenticated');
                    window.location.href = '/incidents'
                } else{
                    console.log('Admin authenticated')
                    window.location.href = '/admin/users'
                }
                

            });
        } catch (error) {
            console.error('Signin error:', error);
            setError('Failed to signin. Please try again.'); // Set error message
        }
    };

    return (
        <div className="signin-container">
            <div className="card signin-form">
                <h2>Signin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <button type="submit">Signin</button>
                </form>

                {error && <p className="error-message">{error}</p>}

                <p>Don't have an Account? <span onClick={handleSignupClick} style={{ cursor: 'pointer', textDecoration: isSignupClicked ? 'underline' : 'none' }}>Sign up</span></p>
            </div>
        </div>
    );
};

export default SigninForm;


