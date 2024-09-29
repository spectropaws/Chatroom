'use client'

import { useSearchParams } from "next/navigation";

export default function Chatroom(){
    const searchParams = useSearchParams();
    searchParams.get('username');

    return (
        <div className="">
            <div className="">
                <h1 className="">
                    Welcome
                </h1>
                <p>this is chatroom page</p>
            </div>
        </div>
    )
}
