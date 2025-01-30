import { v2 as cloudinary } from 'cloudinary';

import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        
        const { text } = req.body;
        let { img } = req.body;
        const myUserId = req.user._id.toString();
        
        const user = await User.findById(myUserId);

        if (!user) return res.status(400).json({message: "User not found"});

        if(!text && !img) return res.status(400).json({message: "Post must have image and text"});

        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: myUserId,
            text,
            img
        })
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in create post: ", error.message);  
    }
}