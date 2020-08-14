let app = require('express')();

let http = require('http').createServer(app);

let io = require('socket.io')(http);

let userList = new Set();

let onlineList = [];

let msgList = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


io.on('connect', (socket) => {

  // 实时新消息
  socket.on('chat msg', (params) => {
    io.emit('chat msg', params);
  });

  // 用户登录
  socket.on('self online', (name) => {
    io.emit('user online', name);
  })

  // 用户离开
  socket.on('disconnect', () => {
    console.log('用户断开链接');
    io.emit('isOnline');
  });

  socket.on('isOnline', (name) => {

  })

})

http.listen(3000, () => {
  console.log('服务启动了')
})
