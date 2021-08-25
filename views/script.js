const socket = io("http://localhost:5000");
socket.on("message", function (data) {
  console.log("hello world");
});