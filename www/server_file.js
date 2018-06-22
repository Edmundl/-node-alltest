const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');//文件上传
const fs=require('fs');
const pathLib=require('path');

var objMulter=multer({dest:'./upload'}); //dest上传路径

var server=express();

// server.use(bodyParser.urlencoded({extended:false}));
server.use(objMulter.any());//中间件
//single可以接受某一个文件
//any可以接受全部文件

server.post('/',function(req,res){
	//原始文件名：req.files[0].originalname
	//临时文件路径：req.files[0].path
	//文件扩展名：pathLib.parse(req.files[0].originalname).ext
	
	//新文件名
	var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
	
	fs.rename(req.files[0].path,newName,function(err){
		if(err){
			res.send('上传失败');
		}else{
			res.send('上传成功');
		}
	})
	
	//1.获取原始文件扩展名
	//2.重命名临时文件
});

server.listen(8080);