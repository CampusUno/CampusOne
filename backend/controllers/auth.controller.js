import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import UserRoleEnum from "../models/user.role.enum.js";

export const signup = async (req, res) => {
    try {
        // console.log("Reached signup route");
        const { fullName, username, email, password, role } = req.body;
        // console.log(req.body)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid email format"});
        }
        if(!email.endsWith("galgotiacollege.edu")){
            return res.status(400).json({error: "Only use college email ID"});
        }
        if(!UserRoleEnum.includes(role)){
            return res.status(400).json({error: "Role must be one from the user-role-enum"});
        }
        if(password.length<6){
            return res.status(400).json({error: "Password must be at least 6 characters long."});   
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({error: "Email is already in use"});
        }

        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({error: "Username is already taken"});
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword,
            role
        })

        // Once new user is created follow further steps
        if(newUser) {
            console.log("new user created")
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save(); // Save to db

            res.status(201).json({
                _id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                // password: newUser.password, Not returning the password to the client
                role: newUser.role,
                profileImg: newUser.profileImg,
                bio: newUser.bio,
                instaLink: newUser.instaLink,
                xp: newUser.xp,
                isVerified: newUser.isVerified
            })

        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller : ", error.message);
        res.status(500).json({ error: "Internal server error "});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); //Comparing the passed password to the one present in the db. If no password in db set it to empty string to avoid getting errors from bcyrpt during comparison
        if(!user){
            return res.status(400).json({error: "User not found"});
        }
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Incorrect Password"});
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profileImg: user.profileImg,
            bio: user.bio,
            instaLink: user.instaLink,
            xp: user.xp,
            isVerified: user.isVerified
        });
    } catch (error) {
        console.log("Error in login controller : ", error.message);
        res.status(500).json({ error: "Internal server error "});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller : ", error.message);
        res.status(500).json({ error: "Internal server error "});
    }
}

export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller : ", error.message);
        res.status(500).json({ error: "Internal server error "});
    }
}