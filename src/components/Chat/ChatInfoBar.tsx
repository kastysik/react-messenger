import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { UserModel } from 'models/User.model';
import './ChatApp.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface ChatInfoBarProps {
    socket: Socket;
}

function ChatInfoBar(props: ChatInfoBarProps) {
    const [users, setUsers] = useState<UserModel[]>([]);
    const menuItems = ['Inbox', 'Starred', 'Send email', 'Drafts'];

    useEffect(() => {
        props.socket.on('server:newUser', (data: UserModel[]) => {
            setUsers(data);
        });
    }, [props.socket, users]);
    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>
            <div className="chat__menu-items">
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <h4 className="chat__header">Active Users</h4>
                <div className="chat__users">
                    {users.map(user => <p key={user.socketId}>{user.userName}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatInfoBar;
