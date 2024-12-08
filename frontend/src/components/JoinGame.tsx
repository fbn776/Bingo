export function JoinGame({onJoin, code}: {
    onJoin: (gameID: string) => void,
    code?: string | null
}) {
    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="p-6 rounded-lg bg-white max-sm:w-[350px] w-[400px]">
            <h1 className="text-2xl mb-2">Join a game</h1>
            <hr/>
            <form className="flex flex-col mt-4" onSubmit={(e) => {
                e.preventDefault();
                const gameID = (e.currentTarget.elements.namedItem("gameID") as HTMLInputElement).value;
                onJoin(gameID);
            }}>
                <label htmlFor="title">Game ID</label>
                <input type="text" name="gameID" className="border-2 px-2 py-3 rounded-lg mt-1 mb-3"
                       placeholder="Enter the game ID" required
                    defaultValue={code || ''}
                />

                <button className="mt-5 button bg-blue-500 hover:bg-blue-700 hover:scale-95">Join</button>
            </form>
        </div>
    </div>
}