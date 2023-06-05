import { useEffect } from "react";

export default function ChatPage(props) {

    const {chatPending, data, actions: {chatList}} = props;

    useEffect(() => {
        const payload = {
            question: "give me 1 grammer  questions with answers for grade 3 in json format"
        }
        chatList();
    }, [chatList]);

    return (
        <>
            <h1>Chat Page</h1>
        </>
    );
}