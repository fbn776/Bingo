# Special

> NOTE: This is for a special case. A gift or a surprise for someone.


In the `.env` file add the following:

```dotenv
VITE_SPECIAL_NAME='<comma seperated names>'
VITE_CONFIRM_NAME='<name to confirm if its the right person>'
```

Adding this will show a special message to the person whose name is in the `VITE_SPECIAL_NAME` variable.
To add a layer of confirmation, the app asks if they are `VITE_CONFIRM_NAME` or not.
- If yes, the special message is shown.
- If no, the app behaves as normal.

