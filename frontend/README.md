# Bingo frontend

This is the frontend for the Bingo multiplayer game.

## Setup

1. Clone the repo or do whatever you want to do to get the code.
2. Run `npm install`/`pnpm install`... to install the dependencies.
3. Create a `.env` file in the root of the frontend directory.
4. Add the following to the `.env` file:
    ```dotenv
    VITE_WS_URL='<url of the websocket server>'
    VITE_API_URL='<url of the backend http server>'
    ```
    > For special cases, see [Special](./docs/sepcial.md)
5. Run `npm run dev`/`pnpm run dev`... to start the development server.