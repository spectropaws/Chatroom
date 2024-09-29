'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Message {
    text: string;
    sender: string | null;
}

export default function Chatroom(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: username }]);
            setMessage('');
        }
    };

    return (
        <div className="">
            <div className="">
                <h1 className="">Welcome, {username}!</h1>

                <div className="">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.sender === username ? 'text-right' : 'text-left'}`}>
                            <span className={`incline-block p-2 rounded ${msg.sender === username ? 'bg-white-500 text-black' : 'bg-blue-500' }`}>
                                {msg.text}
                            </span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className="flex-1 border rounded p-2" />
                    <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">Send</button>
                </form>
                <button onClick={() => router.replace('/')} className="mt-2 bg-red-500 text-white rounded p-2">Leave Chat</button>
            </div>
        </div>
    )
}
