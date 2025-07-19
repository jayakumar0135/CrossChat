import mongoose from "mongoose";
import brcypt from "bcrypt";

//createdAt, updatedAt
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    bio:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:"",
    },
    nativeLanguage:{
        type:String,
        default:"",
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
}, {timestamps:true});

//pre hook
userSchema.pre("save",async function(next){

    if(!this.isModified("password")) return next();
    //12345 => #09wqihsdfkj hashed
    try {
        const salt = await brcypt.genSalt(10);
        this.password = await brcypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.matchPassword = async function(enteredPassword){
    //123456 - passowrd example
    const isPasswordCorrect = await brcypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;
}

const User = mongoose.model("User",userSchema);

export default User;

