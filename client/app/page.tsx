'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";

export default function Home() {
    const [username, setUsername] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            router.push(`/chatroom?username=${encodeURIComponent(username)}`);
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Chatbox</h1>
                <div className="flex w-full max-w-sm items-center space-x-5 p-5">
                    <Input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Button type="submit">Enter Room</Button>
                </div>
            </form>
        </main>
    );
}
