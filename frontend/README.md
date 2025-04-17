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

## Credits

- Notification Sound Effect by <a href="https://pixabay.com/users/rasoolasaad-47313572/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=269296">Rasool Asaad</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=269296">Pixabay</a>