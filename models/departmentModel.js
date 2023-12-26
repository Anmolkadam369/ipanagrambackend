const mongoose = require('mongoose');

const department = new mongoose.Schema({
  
      name:{
        type:String,
        required:true
      },
      doneBy:{
        type:String,
        required:true
      },
      isDeleted:{
        type:Boolean,
        default:false
      },
    },{timestamps:true});

module.exports  = mongoose.model('department', department);