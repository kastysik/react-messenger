import { Socket } from 'socket.io-client';

interface ProfileProps {
    socket: Socket;
}

function Profile(props: ProfileProps) {
    return (
        <div>Profile</div>
    )
}

export default Profile
