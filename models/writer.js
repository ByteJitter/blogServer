
var mongoose=require('mongoose');
var async_hooks=require('async_hooks');
var fs=require('fs');
mongoose.set('useCreateIndex',true);




var guestbookSchema=new mongoose.Schema({
    
    name:{type:String,default:'李明'},
    msg:{type:String},
    email:{type:String},
    date:{type:Date,default:()=>{return Date.now()}}

});



var writerSchema=new mongoose.Schema({
    title:{type:String,required:true,index:{unique:true}},
    mainBody:{type:String,require:true,index:{unique:true}},
    date:{type:Date,default:()=>{return Date.now()}},
    sort:{type:String,required:true},
    weight:{type:Number,required:true,default:1},               /* 权值 */
    guestbook:[guestbookSchema]
});


var writerModel=mongoose.model('writer',writerSchema);
writerModel.createIndexes();






var updateGuestbook=(_id,name,msg,email)=>{
    return writerModel.findOneAndUpdate({
        '_id':_id
    },{
        $push:{
            guestbook:{name,msg,email}
        }
    }
    )
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })

}




var writeBlog=(data)=>{
    var writer=new writerModel(data);
    return writer.save()
            .then(()=>{
                return true
            })
            .catch(()=>{
                return false
            })
};


var getBlog=(_id)=>{
    return writerModel.findById(_id);
}



var getBlogList=()=>{
    return writerModel.find();
}




var deleteBlog=(_id)=>{
    /* return writerModel.deleteOne({"_id":{$gt:_id}},(err)=>{
        if(err){
            return false;
        }
        else{
            return true;
        }
    }); */


    return writerModel.deleteOne({"_id":{$gt:_id}},(err)=>{
        
        if(err){
            return false;
        }
        else{
            return true;
        }
    })
}


var getSortList=()=>{
    return writerModel.aggregate([
        {$group:{
            _id:"$sort",
            title:{"$push":"$title"},
            date:{"$push":"$date"},
            blogId:{"$push":"$_id"}
        }}
    ])
}


var findBySort=(sort)=>{
    return writerModel.find({sort:sort})
}







module.exports={
    writeBlog,
    getBlog,
    getBlogList,
    updateGuestbook,
    getSortList,
    findBySort,
    deleteBlog
}

