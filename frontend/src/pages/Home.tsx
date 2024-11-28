export default function Home() {
    return (
        <main className="flex flex-col items-center size-full">
            <div className="mt-40 mb-28">
                <h1 className="drop-shadow-xl bungee-spice-regular text-8xl">Bingo</h1>
                <h2 className="meow-script-regular text-right text-3xl -mt-3">Play with your friends</h2>
            </div>

            <div className="flex flex-col gap-5">
                <button>
                    Create a game
                </button> <br/>

                <button>
                    Join a game
                </button>
            </div>
        </main>
    );
}