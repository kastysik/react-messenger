import React from 'react';
import './App.css';
import ChatApp from './components/Chat/ChatApp';
import { io } from 'socket.io-client';
import { apiConfig } from './config/config';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import GuardedRoute from 'components/core/GuardedRoute';
import { useAppSelector } from './redux/store';
import { selectUsers } from './redux/slice';
import Profile from 'components/Profile/Profile';
import Layout from 'components/core/Layout';
import Registration from 'components/core/Login/Registration';

const socket = io(apiConfig.api);

function App() {
    const user = useAppSelector((state) =>
        selectUsers(state)
    );
    return (
        <HashRouter>
            <div>
                <Layout socket={socket}>
                    <Routes>
                        <Route path="/" element={<Home socket={socket}/>}/>
                        <Route path="/sign-up" element={<Registration />}/>
                        <Route element={<GuardedRoute auth={!!user}/>}>
                            <Route path="/chat" element={<ChatApp socket={socket}/>}/>
                            <Route path="/profile" element={<Profile socket={socket}></Profile>}/>
                        </Route>
                    </Routes>
                </Layout>
            </div>
        </HashRouter>
    );
}

export default App;
