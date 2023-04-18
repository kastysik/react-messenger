import Message from './Message';
import { useEffect } from 'react';
import { MessageModel } from "models/Message.model";
import "./Messages.css";

interface MessagesProps {
    messages: MessageModel[];
}

function Messages(props: MessagesProps) {

    useEffect(() => {
        const objDiv = document.getElementById('messageList') as HTMLElement;
        objDiv.scrollTop = objDiv?.scrollHeight;
    });
    const messages = props.messages.map((message, i) => {
        return (
            <Message
                key={i}
                message={message}/>
        );
    });
    return (
        <div className='messages' id='messageList'>
            {messages}
        </div>
    );
}

export default Messages;
