export default function MemberCard({ username }: { username: string }) {

    const isTyping = false;

    return (
        <div className="flex w-full py-3 px-5 rounded-xl shadow-md items-center border-2 border-gray-300">
            <div className="w-16 h-16 rounded-full bg-gray-300 mr-3"></div>
            <div>
                <p>{username}</p>
                <p className="text-gray-500">{isTyping ? "typing..." : ""}</p>
            </div>
        </div>
    );
}
