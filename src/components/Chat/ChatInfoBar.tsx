import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { UserModel } from "models/User.model";
import "./ChatApp.css";

interface ChatInfoBarProps {
    socket: Socket;
}

function ChatInfoBar(props: ChatInfoBarProps) {
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        props.socket.on("server:newUser", (data: UserModel[]) => {
            console.log(data);
            setUsers(data);
        });
    }, [props.socket, users]);
    return (
        <div className='chat__sidebar'>
            <h2>Open Chat</h2>
            <div>
                <h4 className='chat__header'>Active Users</h4>
                <div className='chat__users'>
                    {users.map(user => <p key={user.socketId}>{user.userName}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatInfoBar;