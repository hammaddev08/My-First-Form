const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const formSchema=new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    attendence:{
        type:Boolean,
    }
});

const Form=mongoose.model("Form",formSchema);

module.exports={Form};