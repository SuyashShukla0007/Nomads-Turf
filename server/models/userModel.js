import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Example usage when finding users:
// const user = await User.findOne({ username: 'someUsername' });
// if (user && await user.comparePassword('enteredPassword')) {
//     // Password matches
// }

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = (Number)(process.env.SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User=mongoose.model("User",userSchema)

export default User;