var express = require('express');
var router = express.Router();
var db = require('./lib/db');

var nickname='';
var score=0;

/*
    1. 언제 uuid에 따른 회원정보를 불러올것인가(필요한 회원정보: score, nickname, uuid)
    2. 대기실에 들어왔을 때 값들을 어떻게 나눠줄것인가(db에서 가지고 온 값 소켓을 통해 객체에서 가지고 온 값 분류)
*/


function sendUserInfo(res, uuid){
    db.query(`SELECT * FROM user where device_id=?`,[uuid], function(error,result){
        res.render('main.ejs',{
            'nickname':result[0].nickname,
            'score': result[0].score
        });
    })
}

router.get('/', (req, res)=>{ //test용
    if(nickname=='') nickname='default'
    res.render('main.ejs',{'nickname': nickname });
})

  
router.post('/', (req, res) =>{
    var uuid= req.body.uuid;
    console.log('[device connect] user uuid: ',uuid);
    db.query(`SELECT user_id FROM user where device_id=?`,[uuid], function(error,data){
        if(data[0]===undefined){
            res.render('join.ejs');
        }else{
            sendUserInfo(res,uuid);
        }
    });
});

router.post('/join', (req, res) =>{
    var nickname = req.body.nickname;
    var uuid = req.body.uuid;
    console.log("[insert user] input nickname: ", nickname)
    db.query(`INSERT INTO user (device_id, nickname) 
    VALUES(?, ?)`,[uuid,nickname], function(error,result){
      if(error) throw error;
      sendUserInfo(res,uuid);
    });
});


// create Room
router.post('/roomCreate', (req, res) =>{
    var leader = req.body.nickname;
    var score=req.body.score;
    var search_status = req.body.search_status;
    var maxCount = req.body.maxCount;
    var playCount = req.body.playCount;
    var winNum = req.body.winNum;

    db.query(`INSERT INTO room (leader_id, search_status, maxCount, playCount, winNum) 
    VALUES(?, ?,?,?,?)`,[leader,search_status,maxCount,playCount,winNum], function(error,result){
        if(error) throw error;
        // insert 후 가장 최근 입력된 room id값 가지고오기 (최적화?)
        db.query(`select room_id from room order by room_id desc limit 1`,function(error,result){
            if(error) throw error;
            console.log('[insert room] info: leader_id:'+leader+' | search_status: '
            +search_status+' | room id: [',result[0].room_id,']');
            res.render('room.ejs',
            {   
                'leader': leader,
                'nickname':leader,
                'score': score,
                'roomId': result[0].room_id,
                'search_status':search_status,
                'maxCount':maxCount,
                'playCount':playCount,
                'winNum':winNum
            });
        });
    });
});

//join room
router.post('/room', (req, res) =>{
    var nickname = req.body.nickname;
    var roomId=req.body.roomId;
    var score=req.body.score;

    db.query(`select * from room where room_id=?`,[roomId],function(error,result){
        if(error) throw error;
        if(result[0]===undefined){
            console.log("[error] 존재하지 않는 룸 id 입력")
        }else{
            res.render('room.ejs',
            {   
                'leader':result[0].leader_id,
                'nickname':nickname,
                'score': score,
                'roomId': roomId,
                'search_status':result[0].search_status,
                'maxCount':result[0].maxCount,
                'playCount':result[0].playCount,
                'winNum':result[0].winNum
            });
        }
    });
});

module.exports =router;