import { MessageModel } from 'models/Message.model';
import "./Messages.css";
import { useAppSelector } from "redux/store";
import { selectUsers } from "redux/slice";

interface MessageProps {
    message: MessageModel;
}

function Message(props: MessageProps) {
    const user = useAppSelector((state) =>
        selectUsers(state)
    );
    const fromMe = user === props.message.username;
    return (fromMe ? (
            <div className="message__chats">
                <p className='sender__name'>You</p>
                <div className='message__sender'>
                    <p className='message__recipient-message'>{props.message.message}</p>
                </div>
            </div>) : (
            <div>
                <div className="message__chats">
                    <p className='m-0'>{props.message.username}</p>
                    <div className='message__recipient'>
                        <p className='message__recipient-message'>{props.message.message}</p>
                    </div>
                </div>
            </div>)
    );
}

export default Message;
