'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Members from "./components/members";

interface Message {
    text: string;
    username: string | null;
}

export default function Chatroom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const username = searchParams.get('username');

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const chatEndref = useRef<HTMLDivElement>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    };

    const handleEnterKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e as any);
        }
    };

    const handleTextArea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight} px`;
        }
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
                                <span className={`inline-block p-2 rounded-lg max-w-[45%] break-words whitespace-pre-wrap text-left ${msg.username === username ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        <div ref={chatEndref} />
                    </div>
                    <form onSubmit={handleSendMessage} className="bottom-0 left-0 right-0 flex p-4 bg-gray-100 border-t">
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleEnterKey} placeholder="Type a message" className="flex-1 border rounded p-2 resize-none h-5" style={{ height: 'auto' }}/>
                        <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">Send</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
