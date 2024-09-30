"use client";

import { useEffect, useState } from "react";
import MemberCard from "./membercard";

export default function Members() {
    
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        // get all users

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllUsers`)
            .then((res) => res.json())
            .then((userList) => setUsers(userList))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="w-1/4 min-w-[300px] h-full flex flex-col items-center py-10">
            <h1 className="text-3xl">Members</h1>
            <div className="w-[80%] h-[1px] bg-gray-300 my-8" />
            <div className="w-full h-full px-3">
                <ul className="w-full h-full flex flex-col gap-5">
                    {users.map((user: string, index: number) => (
                        <li key={index}><MemberCard username={user} /></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
