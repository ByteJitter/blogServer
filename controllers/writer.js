var writerModel=require('../models/writer');

var {Mongoose,Email}=require('../untils/config');





var getBlog=async(req,res,next)=>{
    /* Mongoose.connect() */
    var _id=req.query._id;
    var result=await writerModel.getBlog(_id);

    if(result){
        res.send({
            msg:'博客获取成功',
            status:0,
            data:result
        })
    }
    else{
        res.send({
            msg:'博客获取失败',
            status:-1
        })
    }
    /* Mongoose.disconnect(); */

};






var getBlogList=async(req,res,next)=>{
    /* Mongoose.connect() */
    
    var result=await writerModel.getBlogList();
    

    if(result){
        res.send({
            msg:'目录获取成功',
            status:0,
            data:result
        })
    }
    else{
        res.send({
            msg:'目录获取失败',
            status:-1
        })
    }
    /* Mongoose.disconnect(); */
};







var getGuestbook=async(req,res,next)=>{

    /* Mongoose.connect() */;

    var _id=req.query._id;
    var blog=await writerModel.getBlog(_id);
    var result=blog.guestbook;
    if(result){
        res.send({
            msg:'获取留言成功',
            status:0,
            data:result
        })
    }
    else{
        res.send({
            msg:'获取留言失败',
            status:-1,
            blog
        })
    }
   /*  Mongoose.disconnect() */
};






var writeBlog=async(req,res,next)=>{
    /* Mongoose.connect() */
    var {title,mainBody,weight,sort}=req.body;
    /* var date=dateInstance.getFullYear(); */
    var result=await writerModel.writeBlog({
        title,mainBody,weight,sort
    })

    if(result){
        res.send({
            msg:'博客保存成功',
            status:0,
        });
    
    }
    else{
        res.send({
            msg:'博客保存失败',
            status:-1
        })
    }
    /* Mongoose.disconnect(); */
};






var deleteBlog=async(req,res,next)=>{
    /* Mongoose.connect() */;
    var {_id}=req.body;
    var result=await writerModel.deleteBlog(_id);

    if(result){
        res.send({
            status:0,
            msg:'博客删除成功'
        })
    }
    else{
        res.send({
            status:-1,
            msg:'博客删除失败'
        })
    }


    /* Mongoose.disconnect(); */
};







var recommedBlog=async(req,res,next)=>{
    /* Mongoose.connect() */
    res.send({
        msg:'nishizhu',
        data:{}
    })
    /* Mongoose.disconnect(); */
    };


var getSortList=async(req,res,next)=>{
    /* Mongoose.connect() */;


    var group=await writerModel.getSortList();

    if(group){
        res.send({
            msg:'分类列表获取成功',
            status:0,
            data:group
        })
    }
    else{
        res.send({
            msg:'分类列表获取失败',
            status:-1
        })
    }
    
    /* Mongoose.disconnect(); */
}




var getSort=async(req,res,next)=>{

    /* Mongoose.connect() */;

    var sort=req.query.sort;

    var result=await writerModel.findBySort(sort);
    if(result){
        res.send({
            msg:'获取成功',
            status:0,
            data:result
        })
    }
    else{
        res.send({
            msg:'获取失败',
            status:-1
        })
    }

    /* Mongoose.disconnect(); */
}



var verify=async(req,res,next)=>{
    var verify=Email.verify;
    
    req.session.verify=verify;
    req.session.date=Email.date;
    
    
    var email='gj508299098@163.com';



    var mailOption={
        from:'508299098@qq.com',
        to:email,
        subject:'博客管理员验证',
        text:'本次验证码为:'+verify
    }

    Email.transporter.sendMail(mailOption,(err)=>{
        if(err){
            res.send({
                status:-1,
                msg:'验证码发送失败',
                
            })
        }
        else{
            res.send({
                status:0,
                msg:'验证码发送成功',
                /* 验证码:req.session.verify */
            })
        }
    })


}

var login=async(req,res,next)=>{
    var {verify}=req.body;
    
    if(verify==req.session.verify){
        req.session.adminStatus=true
        res.send({
            status:0,
            msg:'登陆成功'
        })
    }
    else{
        res.send({
            status:-1,
            msg:'登录失败'
        })
    }
}



var getAdminStatus=(req,res,next)=>{
    if(req.session.adminStatus){
        res.send({
            status:0,
            msg:'管理员已登录'
        })
    }
    else{
        res.send({
            status:-1,
            msg:'管理员未登录'
        })
    }
}



var logout=async(req,res,next)=>{
    req.session.adminStatus=false;
    if(!req.session.adminStatus){
        res.send({
            status:0,
            msg:'登出成功'
        })
    }
    else{
        res.send({
            status:-1,
            msg:'登出失败'
        })
    }

}



module.exports={
    getBlog,getBlogList,writeBlog,deleteBlog,recommedBlog,getGuestbook,getSortList,getSort,verify,login,getAdminStatus,logout

}