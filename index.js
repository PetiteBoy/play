let app = require('express')();

let http = require('http').createServer(app);

let io = require('socket.io')(http);

let userList = [];

let onlineList = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


io.on('connect', (socket) => {

  // 新消息过来了
  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg)

  })

  socket.on('self online', (name) => {
    userList.push(name);
    console.log(name)
    io.emit('user online', name)
  })

  socket.on('disconnect', () => {
    console.log('用户断开链接')
  })

})

http.listen(3000, () => {
  console.log('服务启动了')
})
