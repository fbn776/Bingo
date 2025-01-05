# Special

> NOTE: This is for a special case. A gift or a surprise for someone.


In the `.env` file add the following:

```dotenv
VITE_SPECIAL_NAME_LIST='<comma seperated names that is special>'
VITE_CONFIRM_NAME='<real name of the person>'
VITE_OTHER_NAME='<special name>'
VITE_SPECIAL_MSG1='<first message to display'
VITE_SPECIAL_MSG2='<second message to display'
VITE_SPECIAL_MSG3='<third message to display'
```

Adding this will show a special message to the person whose name is in the `VITE_SPECIAL_NAME` variable.
To add a layer of confirmation, the app asks if they are `VITE_CONFIRM_NAME` or not.
- If yes, the special message is shown.
- If no, the app behaves as normal.

