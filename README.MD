# Adalo Local Storage component

This component allows reading and writing key/value pairs of information locally to the phone through Adalo.

This component has not been published to the marketplace at the time of this writting so the only way to use it is locally.

## Motivation

The motivation behind this component is sometimes you want to provide a tailored user experience before they sign-in. If you have a Welcome screen you might want to show it only the first time the application runs on the phone.

If you have sensitive information that you do not want to store in the cloud, or share between phones this would work as well.

## Running private

Prerequisites

- NodeJS
- Yarn
- Linux/macOS/WSL

Clone the respository and run
``` bash
$ yarn                #install dependencies
$ npx adalo login     # login to your adalo account
$ npx adalo publish   # deploy the component privately to your account
```

### Troubleshooting

You might receive an error that the package already exists, if that is the case open `package.json` and edit the name to something unique. Perhaps `{companyname}-local-storage`.

Once the key is written it cannot be unwritten by the app. While developing you need to clear the keys manually.

* Web - using the developer console (F12) navigate to the application tab, then local storage, and choose `https://previewer.adalo.com` from the key\value list select the key you created and delete it.
* Android - long press the app icon and select app info (depending on os it might be an (i) or info), then choose storage, then `Clear Data`. **Warning**: this is destructive and not selective. It will clear all data stored in the app.
* Apple - uninstall the app and reinstall the app

## How to use the component

Once the component is installed you can drag and drop the local storage component onto your app screen. And configure it as follows

| Name | Type | Description |
| --- | --- | --- |
| `Mode` | list | Read Only - reads a key from the phone then displays it in a label and fires an action |
| | | Read/Write - reads or writes a value from the phone using a TextInput |
| `Storage Key` | string | The unique identifier to the value you want to save. e.g. `UserToken`
| `Default Value` | string | If the value does not exist, it will be created using this value. If you select to override existing key on load, this value will be stored when the page loads (Read/Write mode only) |
| `Value to display if the key is not found` | string | In the event that the key does not exist on the phone, this text will be displayed in the text field (Read Only mode)
| `Fired when the storage value is read` | action | This action is fired when the key is read from the phone. Phone reads are asyncronous so if you want to do something with the data you will need to wire it up to this action (Read Only mode) |
| `Overwrite existing key on load` | boolean | Selecting this option will force the value of the key to be the default value. If this option is not selected and the key exists, the original value is maintained. e.g. If you wanted to track the last page a non-authenticated user went to, you would add a Read/Write component to each page and set the default value to the name of the page and turn this option on. If you wanted to generate a unique token to identify a phone, you would set this off so it would not overwrite the data |



There are basic styling options as well if you want to display the infomation. If you want the component to be invisible for behind the scene work set the width and height to 0px and turn styling off.