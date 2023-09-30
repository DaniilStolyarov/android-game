const express = require('express')

const WebSocket = require('ws')

const connectedSockets = [];

const app = express();
app.get("/", (req, res) =>
{
    res.send('hello')
    console.log(req.body)
})
const httpServer = app.listen(3000)
const wsServer = new WebSocket.Server({server : httpServer})
wsServer.on("connection", ws =>
{
    connectedSockets.push(ws);
    setInterval(() => {
        ws.ping();
        ws.pong();
    }, 10000);
    
    ws.on("message", message =>
    {
        
        console.log(message.toString());   
        if (message.toString() === "vibro_request")
        {
            connectedSockets.forEach(socket =>
                {
                    if (socket !== ws)
                    {
                        socket.send("vibro_start")
                    }
                })
        }
        
    
    })
})
