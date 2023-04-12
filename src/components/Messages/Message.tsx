import { MessageModel } from 'models/Message.model';

interface MessageProps {
    message: MessageModel;
}

function Message(props: MessageProps) {
    const fromMe = props.message?.fromMe ? 'from-me' : '';
    return (
        <div className={`message ${fromMe}`}>
            <div className='username'>
                { props.message.username }
            </div>
            <div className='message-body'>
                { props.message.message }
            </div>
        </div>
    );
}

export default Message;
