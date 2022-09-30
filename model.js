const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publishedDate:{
        type:String,
        required:true,
    },
    publisher:{
        type:String,
        required:true,
    },
    noOfPages:{
        type:String,
        required:true,
    }
});

module.exports=new mongoose.model("book",bookSchema);