import ChatInput from './ChatInput';
import * as React from 'react';
import { useState } from 'react';
import Messages from '../Messages/Messages';
import { MessageModel } from 'models/Message.model';
import { io } from 'socket.io-client';
import config from 'config/config';

interface ChatAppProps {
    messages?: MessageModel[];
    currentUsername: string;
}

interface ChatAppState {
    messages: MessageModel[];
}

function ChatApp(props: ChatAppProps) {
    const [state, setState] = useState<ChatAppState>({ messages: [] });
    const socket = io(config.api).connect();
    socket.on('server:message', message => {
        setState({messages: [...state.messages, message]});
    });
    const sendHandler = (message: string) => {
        const messageObject: MessageModel = {
            username: props.currentUsername,
            message,
            fromMe: false
        };
        socket.emit('client:message', messageObject);
        messageObject.fromMe = true;
        setState({messages: [...state.messages, messageObject]});
    };

    return (
        <div className="container">
            <h3>React Chat App</h3>
            <Messages messages={state.messages}/>
            <ChatInput onSend={sendHandler}/>
        </div>
    );
}

export default ChatApp;
