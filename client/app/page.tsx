'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()){
      router.push(`/chatroom?username=${encodeURIComponent(username)}`);
    }
  };

  return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Chatbox</h1>
          <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} 
            className=""
            required
          />
          <button type="submit" className="">Enter ChatBox</button>
          </form>
        </main>  
    );
}
