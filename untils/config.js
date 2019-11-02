var mongoose=require('mongoose');
var nodemailer=require('nodemailer');


//mongo连接配置
var Mongoose={
    url:'mongodb://localhost:27017/blog,guestbookDb',
    url1:'mongodb://localhost:27017/blog',
    connect(){
        mongoose.connect(this.url1,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false},(err)=>{
            if(err){
                console.log('数据库连接失败');
            }
            console.log('数据库连接成功')
        });

        /* mongoose.createConnection(this.url,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false},(err)=>{
            if(err){
                console.log('数据库连接失败');
            }
            else{
            console.log('数据库连接成功')
            }
        }); */
        
    },
    disconnect(){
        mongoose.disconnect((err)=>{
            if(err){
                console.log('数据库断开失败');
            }
            else{
            console.log('数据库断开成功')
            }
        })
    }
}

var gb_hDb={
    url:'mongodb://localhost:27017/guestbookDb',
  /*    options = {  
        server: {
            auto_reconnect: true,
            poolSize: 10
        },
        

    }, */
    connect(){
        mongoose.connect(this.url,{useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false},(err)=>{
            if(err){
                console.log('guestbookDb连接失败');
            }
            console.log('guestbookDb连接成功')
        });
    },
    disconnect(){
        mongoose.disconnect((err)=>{
            if(err){
                console.log('guestbookDb断开失败');
            }
            console.log('guestbookDb断开成功')
        })
    }
}





var Email={
    config:{
        host: "smtp.qq.com",
        port: 587,
        auth: {
        user: '508299098@qq.com', // generated ethereal user
        pass: 'btkqjrnnggdnbigf' // generated ethereal password
        }
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        
        return Math.random().toString().substring(2,6);
    },
    get time(){
        return Date.now();
    }
}








module.exports={
    Mongoose,gb_hDb,Email
}