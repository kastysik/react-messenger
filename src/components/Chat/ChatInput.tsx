import { ChangeEvent, FormEvent, useState } from 'react';

interface ChatInputProps {
    onSend: (value: string) => void;
}

function ChatInput(props: ChatInputProps) {
    const [state, setState] = useState({ chatInput: '' });

    const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ chatInput: event.target.value });
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSend(state.chatInput);
        setState({chatInput: ''});
    }

    return (
        <form className="chat-input" onSubmit={submitHandler}>
            <input type="text"
                   onChange={textChangeHandler}
                   value={state.chatInput}
                   placeholder="Write a message..."
                   required />
        </form>
    );
}

export default ChatInput;
