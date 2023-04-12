import React, { useState } from 'react';
import './App.css';
import ChatApp from './components/Chat/ChatApp';

function App() {
    const [state, setState] = useState({ username: '', submitted: false });
    const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ username: event.target.value, submitted: false });
    }
    const usernameSubmitHandler = () => {
        setState({ submitted: true, username: state.username });
    }
    if (state.submitted) {
        return (
            <ChatApp currentUsername={state.username} />
        );
    }
    return (
        <form onSubmit={usernameSubmitHandler} className="username-container">
            <h1>React Instant Chat</h1>
            <div>
                <input
                    type="text"
                    onChange={usernameChangeHandler}
                    placeholder="Enter a username..."
                    required/>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default App;
