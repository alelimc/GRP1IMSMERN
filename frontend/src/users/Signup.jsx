import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { create } from './api-user';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSigninLinkClick }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigninClicked, setIsSigninClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: name || undefined,
            email: email || undefined,
            password: password || undefined,
            role: 'user' // Hardcoded role value
        };

        create(user).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log('Signup successful');
                setIsSignupSuccess(true);
                setOpenDialog(true);
                navigate('/signin');
            }
        });
    };

    return (
        <div className="signup-container">
            <div className="card signup-form">
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="lastName">Name:</label>
                        <input 
                            type="lastName" 
                            id="lastName" 
                            name="lastName" 
                            placeholder="Enter your name" 
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
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
                    <button type="submit">Sign up</button>
                </form>
                <p>Already have an Account? <span onClick={() => navigate('/signin')} style={{ cursor: 'pointer', textDecoration: isSigninClicked ? 'underline' : 'none' }}>Sign in</span></p>
            </div>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>New account successfully created.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus variant="contained">Sign In</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SignupForm;
