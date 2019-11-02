
var {Mongoose,gb_hDb}=require('../untils/config');
var writerModel=require('../models/writer.js');

var gb_hModel=require('../models/guestbook.js');




var leaveMsg=async(req,res,next)=>{

    /* Mongoose.connect(); */

    var {_id,msg,name,email}=req.body

    var result=await writerModel.updateGuestbook(_id,name,msg,email)
    if(result){
        res.send({
            status:0,
            msg:'留言成功'
        })
    }
    else{
        res.send({
            status:-1,
            msg:'留言失败,请留意用户名或邮箱'
        })
    }
    /* Mongoose.disconnect(); */
};


var leaveMsg_h=async(req,res,next)=>{

    /* gb_hDb.connect(); */

    var {name,msg,email}=req.body;

    var result=await gb_hModel.save({name,msg,email});
    
    if(result){
        res.send({
            status:0,
            msg:'留言成功'
        })
    }
    else{
        res.send({
            status:-1,
            msg:'留言失败'
        })
    }

    /* gb_hDb.disconnect() */
};



var getGuestbook_h=async(req,res,next)=>{

    /* gb_hDb.connect(); */
    var result=await gb_hModel.getAll();

    if(result){
        console.log(result);
        res.send({
            status:0,
            msg:'获取留言板成功',
            data:result
        })
    }
    else{
        res.send({
            status:-1,
            msg:'获取留言板失败'
        })
    }

    /* gb_hDb.disconnect(); */
};


var deleteMsg_h=async(req,res,next)=>{

   /*  gb_hDb.connect(); */

    var _id=req.body;
    var result=await gb_hModel.deleteMsg(_id);
    if(result){
        res.send({
        status:0,
        msg:'删除成功'
        })
    }
    else{
        res.send({
        status:-1,
        msg:'删除失败'
        })
    }
    

    /* gb_hDb.disconnect(); */
}



module.exports={
    leaveMsg,leaveMsg_h,getGuestbook_h,deleteMsg_h
}