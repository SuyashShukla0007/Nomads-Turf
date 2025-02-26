import User from "../models/userModel.js";

export const registerUser = async (req, res)=>{
    const {username, email, password} = req.body;
    try {
        const newUser = new User({
            username,
            email,
            password
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const loginUser= async(req,res)=>{
    const {username,password}=req.body;
    const user=await User.findOne({username});
    if(!user){
        res.status(404).json({message:"Invalid Credentials"});
    }
    else if(await user.comparePassword(password) == false){
        res.status(404).json({message:"Invalid Credentials"});
    }
    else{
        res.status(200).json(user);   // implement jwt token at later stage
    }
}

export const getUserById= async(req,res)=>{
    const {id}=req.body;
    const user=await User.findById(id);
    if(!user){
        res.status(404).json({message:"User not found"});
    }
    else{
        res.status(200).json(user);
    }
}