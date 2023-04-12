import Message from './Message';
import { useEffect } from 'react';

interface MessagesProps {
    messages: any[];
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
                message={message.message} />
        );
    });
    return (
        <div className='messages' id='messageList'>
            { messages }
        </div>
    );
}

export default Messages;
