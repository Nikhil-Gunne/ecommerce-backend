const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    cart:{
        type:Array
    }
},{timestamps:true})


// static functions
userSchema.statics.signup = async function (email,password) {
    // console.log(email,password);
    
    // validating is an valid email
    if(!validator.isEmail(email)){
        throw Error("invalid email")
    }
    //validating is password strong
    if(!validator.isStrongPassword(password)){
        throw Error("password is not strong")
    }

    const userAlreadyExists = await this.findOne({email})
    // console.log(userAlreadyExists);
    //if user exists
    if(userAlreadyExists){
        throw Error("user already exists")
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password,10)
    const createdUser= await this.create({email,password:hashedPassword})
    // console.log(createdUser)
    return createdUser
}

userSchema.statics.login= async function(email,password){
    // validating is an valid email
    
    if(!validator.isEmail(email)){
        throw Error("invalid email")
    }

    const isUserPresent = await this.findOne({email})
    if(!isUserPresent){
        throw Error("user doesn't exists with this email")
    }

    const passwordMatched = await bcrypt.compare(password,isUserPresent.password)

    //if password matches
    if(!passwordMatched){
        throw Error(`password doesn't match`)
    }
    
    return isUserPresent


}
module.exports=mongoose.model("users",userSchema);