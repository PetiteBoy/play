let app = require('express')();

let http = require('http').createServer(app);

let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


io.on('connect', (socket) => {
  console.log('用户链接')

  // 新消息过来了
  socket.on('chat message', (msg) => {
    console.log('新消息过来了', msg)

    io.emit('chat message', msg)

    socket.broadcast.emit('hi')
  })
  socket.on('disconnect', () => {
    console.log('用户断开链接')
  })


})

http.listen(3000, () => {
  console.log('服务启动了')
})
