import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import './Login.css';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { ApiService } from 'services';

function Registration() {
    const [state, setState] = useState({ nickname: '', name: '', surname: '' });

    const handleSignUp = () => {
        const user = {
            name: state.name,
            surname: state.surname,
            nickname: state.nickname
        };
        ApiService.post('/postUser', user).subscribe(res => {
            console.log(res);
        });
    }

    const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, nickname: event.target.value });
    }
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, name: event.target.value });
    }
    const surnameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, surname: event.target.value });
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="sign-up"
        >
            <TextField label="Nickname" color="primary" className="sign-up-input" required
                       onChange={usernameChangeHandler}
            />
            <TextField label="Password" color="primary" className="sign-up-input" required
            />
            <TextField
                label="Name"
                color="primary"
                className="sign-up-input"
                onChange={nameChangeHandler}
            />
            <TextField
                label="Surname"
                color="primary"
                className="sign-up-input"
                onChange={surnameChangeHandler}
            />
            <Button className="submit-sign-up" variant="outlined" onClick={handleSignUp}>Submit</Button>
        </Box>
    )
}

export default Registration;
