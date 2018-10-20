module.exports = (io) => {
    var roomList=[];

    // var roomList = [
    //    { _id: 1,  userInfo:[  {uuid nickname: nc, score:score ready: false },  {nickname: da, ready: true}  ]  }
    //    { _id: 2,  userInfo:[  {nickname: nc, ready: false} ]  }
    //    { _id: 3,  userInfo:[  {nickname: nc, ready: false},  {nickname: da, ready: false}  ]  }
    // ]
    io.on('connection', (socket) => { 
        console.log('>>a user connected');
        socket.on('joinInfo', function(data) {
            var roomId=socket.roomId =data.roomId;
            console.log("accept roomId:"+roomId); 

            if(roomList[roomId]===undefined){ 
                roomList[roomId]={_id:roomId, userInfo:[{'nickname':data.name, 'score':data.score, 'ready':false}]};
            }else { 
                roomList[roomId].userInfo.push({'nickname':data.name, 'score':data.score, 'ready':false});
            }
            socket.join(roomId);
            io.to(roomId).emit('roomInfo',roomList[roomId].userInfo);
        })
        // socket.on('joinInfo', function(data) {
        //   var name=socket.name =data.name;
        //   var roomNum=socket.roomNum =data.roomNum;
      
        //       if(roomList[roomNum]==undefined){ 
        //         roomList[roomNum]={_id:roomNum, names:[name]};
        //       }else { 
        //         roomList[roomNum].names.push(name);
        //       }
        //     socket.join(roomNum);
      
        //     io.to(roomNum).emit('roomData',roomList[roomNum].names);
        //   });
    });
};