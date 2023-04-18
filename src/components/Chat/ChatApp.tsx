import ChatInput from './ChatInput';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Messages from '../Messages/Messages';
import { MessageModel } from 'models/Message.model';
import { Socket } from 'socket.io-client';
import ChatInfoBar from "components/Chat/ChatInfoBar";
import "./ChatApp.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface ChatAppProps {
    messages?: MessageModel[];
    socket: Socket;
}

interface ChatAppState {
    messages: MessageModel[];
}

function ChatApp(props: ChatAppProps) {
    const [state, setState] = useState<ChatAppState>({ messages: [] });
    const currentUserName = localStorage.getItem('userName') ?? '';
    const navigate = useNavigate();
    useEffect(() => {
        props.socket.on('server:message', message => {
            setState({messages: [...state.messages, message]});
        });
    });
    const sendHandler = (message: string) => {
        const messageObject: MessageModel = {
            username: currentUserName,
            message,
        };
        props.socket.emit('client:message', messageObject);
    };

    const disconnectHandler = () => {
        localStorage.removeItem("userName");
        navigate('/');
        window.location.reload();
    }

    return (
        <div className="chat">
            <ChatInfoBar socket={props.socket}/>
            <div className="chat__main">
                <header className="chat__main-header">
                    <h3>Chat</h3>
                    <Button variant="outlined" onClick={disconnectHandler}>Disconnect</Button>
                </header>
                <Messages messages={state.messages}/>
                <ChatInput onSend={sendHandler}/>
            </div>
        </div>
    );
}

export default ChatApp;
