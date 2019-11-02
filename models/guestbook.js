var mongoose=require('mongoose');
mongoose.set('useCreatIndex',true)

var gb_hSchema=new mongoose.Schema({
    name:{type:String},
    msg:{type:String},
    email:{type:String},
    date:{type:Date,default:()=>{return Date.now()}}

});


var gb_hModel=new mongoose.model('guestbook',gb_hSchema);
gb_hModel.createIndexes();



var save=(data)=>{
    var guestbook=new gb_hModel(data);
    return guestbook.save()
            .then(()=>{
                return true;
            })
            .catch((err)=>{
                return false;
            })

};



var getAll=()=>{
    return gb_hModel.find();
};

var deleteMsg=(_id)=>{
     return gb_hModel.deleteOne({"_id":{$gt:_id}},(err)=>{
        
        if(err){
            return false;
        }
        else{
            return true;
        }
    })
};











module.exports={
    save,getAll,deleteMsg
}