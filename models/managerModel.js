const mongoose = require('mongoose');

const manager = new mongoose.Schema({
    email:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
    
      },
      firstName:{
        type:String,
        required:true
    
      },
      lastName:{
        type:String,
        required:true
      },
      department:{
        type:String,
        // required:true
      },
      location:{
        type:String,
        required:true
      },
      designation:{
        type:String,
        default:"Manager"
      },
      isDeleted:{
        type:Boolean,
        default:false
      },
    },{timestamps:true});

module.exports  = mongoose.model('manager', manager);