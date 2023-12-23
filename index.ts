const server = Bun.serve<{ authToken: string }>({
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    return new Response('Welcome to the websocket server. You have not upgraded to wss. Please try to connect with ws or wss instead of HTTP.', { status: 500 });
  },
  websocket: {
    // this is called when a message is received
    async message(ws, message) {
      console.log(`Received ${message}`);
      // send back a message
      ws.send(`You said: ${message}`);
    },
    open(ws) {
      console.log('connection opened')
      ws.send("Welcome to my websocket server.")
    },
    close(ws){
      console.log('connection closed')
    }
  },
  port: 3000,
});

console.log(`Listening on ${server.hostname}:${server.port}`);
