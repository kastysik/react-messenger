import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextField from "@mui/material/TextField";
import "./ChatApp.css";
import Button from "@mui/material/Button";

interface ChatInputProps {
    onSend: (value: string) => void;
}

function ChatInput(props: ChatInputProps) {
    const [state, setState] = useState({ chatInput: '' });

    const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ chatInput: event.target.value });
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSend(state.chatInput);
        setState({chatInput: ''});
    }

    return (
        <form className="chat-input" onSubmit={submitHandler}>
            <TextField
                className="chat-input__control"
                variant="outlined"
                type="text"
                value={state.chatInput}
                onChange={textChangeHandler}
                label="Write a message"
                required/>
            <Button type="submit" variant="outlined">Send</Button>
        </form>
    );
}

export default ChatInput;
