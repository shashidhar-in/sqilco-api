const UserModel = require("../model/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
module.exports = {
 
    registerUser: async (req,res)=>{
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try{
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({message:'success', data: response});
        }catch(err){
            return res.status(500).json({message: 'error', err});
        }
    },

    // check user using email
    // compare password 
    // create jwt token
    // send response to client
    loginUser:async (req,res)=>{
       try{
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(401)
                .json({message: 'Auth failed, Invalid username/password'});
        }

        const isPassEqual = await bcrypt.compare(req.body.password, user.password);
        if(!isPassEqual){
            return res.status(401)
                .json({message: 'Auth failed, Invalid username/password'});
        }
        const tokenObject = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {expiresIn: '4h'});
         res.cookie('jwtToken', jwtToken, { httpOnly: true });
        return res.status(200)
            .json({jwtToken, tokenObject});
       }catch(err){
            return res.status(500).json({message:'error',err});
       }
    },
logoutUser : async(req,res)=>{
        try{
           res.clearCookie('jwtToken');
    return res.status(200).json({ message: 'Logged out successfully' });
        }catch(err){
            return res.status(500)
                .json({message:'error', err});
        } 
    },

    getUsers : async(req,res)=>{
        try{
            const users = await UserModel.find({}, {password:0});
            return res.status(200)
                .json({data: users});
        }catch(err){
            return res.status(500)
                .json({message:'error', err});
        } 
    }
}