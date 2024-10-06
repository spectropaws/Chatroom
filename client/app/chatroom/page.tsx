'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import Members from "./components/members";
import { io } from "socket.io-client";

interface Message {
    text: string;
    username: string | null;
}

function Chatroom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    const socket = useRef(io(`${process.env.NEXT_PUBLIC_API_URL}`)).current;

    const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const chatEndref = useRef<HTMLDivElement>(null);
   
    useEffect(() => {
        if (!joinedRoom) {
            socket.emit('joinroom', username);
            setJoinedRoom(true);
        }
    }, [joinedRoom, socket, username]);

    useEffect(() => {
    socket.on('message', (data: Message) => {
        console.log(data);
        setMessages(prevMessages => [...prevMessages, data]); 
    });

    return () => {
        socket.off('message');
    };
}, [socket]);
    
    useEffect(() => {
        if (chatEndref.current) {
            chatEndref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [message]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { text: message, username: username }]);
            setMessage('');
        }
        socket.emit("message", { text: message, username: username });
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        socket.emit('typing', { username: username });
    };

    return (
        <div className="flex flex-col w-screen h-screen">

            <div className="right-0 bg-black w-full flex justify-between items-center p-2">
                <span className="text-white text-lg font-extrabold">CHAT BOX</span>
                <button onClick={() => router.replace('/')} className="bg-red-500 text-white text-sm font-bold rounded px-2 py-2">Leave Chat</button>
            </div>

            <div className="flex w-full h-full">
                <Members />
                <div className="relative h-full w-3/4 flex flex-col">

                    <div className="flex-grow overflow-y-auto px-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.username === username ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block p-2 rounded-lg ${msg.username === username ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        <div ref={chatEndref} />
                    </div>
                    <form onSubmit={handleSendMessage} className="bottom-0 left-0 right-0 flex p-4 bg-gray-100 border-t">
                        <input type="text" value={message} onChange={handleMessageChange} placeholder="Type a message" className="flex-1 border rounded p-2" />
                        <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">Send</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Chatroom />
        </Suspense>
    )
}
