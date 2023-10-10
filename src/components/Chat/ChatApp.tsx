import ChatInput from './ChatInput';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Messages from '../Messages/Messages';
import { MessageModel } from 'models/Message.model';
import { Socket } from 'socket.io-client';
import './ChatApp.css';

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

    useEffect(() => {
        props.socket.on('server:message', message => {
            setState({ messages: [...state.messages, message] });
        });
    });
    const sendHandler = (message: string) => {
        const messageObject: MessageModel = {
            username: currentUserName,
            message,
        };
        props.socket.emit('client:message', messageObject);
    };

    return (
        <><Messages messages={state.messages}/><ChatInput onSend={sendHandler}/></>
    );
}

export default ChatApp;
