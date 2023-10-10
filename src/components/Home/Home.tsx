import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import { usersActions } from "redux/slice";

interface HomeProps {
    socket: Socket;
}

function Home(props: HomeProps) {
    const [state, setState] = useState({username: '', submitted: false});
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    const setUser = (user: string) => appDispatch(usersActions.setUsers(user));
    const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({username: event.target.value, submitted: false});
    }
    const usernameSubmitHandler = () => {
        setState({submitted: true, username: state.username});
        localStorage.setItem("userName", state.username);
        setUser(state.username);
        props.socket.emit("client:newUser", {userName: state.username, socketId: props.socket.id});
        navigate("/chat");
    }
    const signUpHandler = () => {
        navigate("/sign-up");
    }
    return (
        <form onSubmit={usernameSubmitHandler} className="username-container">
            <h1>Sign in</h1>
            <div>
                <TextField
                    variant="outlined"
                    type="text"
                    onChange={usernameChangeHandler}
                    label="Enter a username"
                    required/>
            </div>
            <Button className="submit-username" type="submit" value="Submit" variant="outlined">Submit</Button>
            <Button className="sign-up" variant="outlined" onClick={signUpHandler}>Sign up</Button>
        </form>
    )
}

export default Home;
