import {Link} from "react-router";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center size-full">
            <div className="flex flex-col h-[60%]">
                <div className="">
                    <h1 className="drop-shadow-xl bungee-spice-regular text-8xl">Bingo</h1>
                    <h2 className="meow-script-regular text-right text-3xl -mt-3">Play with your friends</h2>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center gap-5">
                    <Link
                        className="primary-button w-[180px]"
                        to={{
                            pathname: "/game",
                            search: "?type=create",
                        }}
                    >
                        Create a game
                    </Link>
                    <Link
                        className="primary-button w-[180px]"
                        to={{
                            pathname: "/game",
                            search: "?type=join",
                        }}
                    >
                        Join a game
                    </Link>
                </div>
            </div>
        </main>
    );
}