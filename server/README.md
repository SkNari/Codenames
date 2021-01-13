# Server

This is the server side of the Codenames application

## Installation

Require nodejs and npm

```bash
npm i
```

## Usage

```bash
npm start
```

The server uses the socket.io package. [socket.io](https://socket.io/)

It can throws and receive multiple events when communicating with the client.
Here are the events.

**Receives**:

askForRooms : client is asking for current rooms

createRoom : client is asking to create a room

joinRoom : client is asking to join a room

chat : client is sending a message in the chat

leaveRoom : client is leaving the room

disconnect : client is disconnecting


**Throws**:

roomUpdate : server is sending an update of a certain room

chatUpdate : server is sending an update of the chat of a certain room

roomCreated : server is informing the client that it created a room for him

sendRooms : server is sending current rooms


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
