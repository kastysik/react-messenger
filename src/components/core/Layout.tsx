import * as React from 'react';
import { ReactElement } from 'react';
import Header from 'components/core/Header';
import { useAppSelector } from 'redux/store';
import { selectUsers } from 'redux/slice';
import ChatInfoBar from 'components/Chat/ChatInfoBar';
import { Socket } from 'socket.io-client';
import "./Layout.css";

interface LayoutProps {
    children: ReactElement;
    socket: Socket;
}

function Layout(props: LayoutProps) {
    const user = useAppSelector((state) =>
        selectUsers(state)
    );
    return (
        !!user ? <div className="container">
            <ChatInfoBar socket={props.socket}/>
            <div className="layout">
                <Header/>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div> : <div> {props.children} </div>
    )
}

export default Layout;
