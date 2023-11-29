const express = require("express");
const socket=require("socket.io");

const app=express();

app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"));

let port=3000;
let server=app.listen(port,()=>{

    console.log("Server running "+port);
})

let io=socket(server);

io.on("connection",(socket)=>{
    console.log("Made Socket Connection");

    socket.on("beginPath",(data)=>{
          io.sockets.emit("beginPath",data);
    })

    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data);
  })
  socket.on("undoRedo", (data) => {
    io.sockets.emit("undoRedo",data);
})
})