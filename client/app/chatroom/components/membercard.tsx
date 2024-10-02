"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function MemberCard({ username }: { username: string }) {

    const socket = useRef(io(`${process.env.NEXT_PUBLIC_API_URL}`)).current;

    const [userTyping, setUserTyping] = useState<string>("");

    useEffect(() => {
        socket.on('typing', (user: { username: string }) => {
            setUserTyping(user.username);
            setTimeout(() => {
                setUserTyping("");
            }, 3000);
        });

        return () => {
            socket.off('typing');
        };
    }, [socket]);

    return (
        <div className="flex w-full py-3 px-5 rounded-xl shadow-md items-center border-2 border-gray-300">
            <div className="w-16 h-16 rounded-full bg-gray-300 mr-3"></div>
            <div>
                <p>{username}</p>
                <p className="text-gray-500">{userTyping && userTyping === username ? "typing..." : ""}</p>
            </div>
        </div>
    );
}
