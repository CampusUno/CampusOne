import { v2 as cloudinary } from 'cloudinary';

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from '../models/notification.model.js';

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
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in create post: ", error.message);  
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(400).json({message: "Post not found"});

        const myUserId = req.user._id.toString();
        if(post.user.toString() !== myUserId) {
            return res.status(401).json({message: "You are not authorized to delete this post"});   
        }

        if(post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post deleted successfully"});

    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in delete post: ", error.message);  
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text) return res.status(400).json({message: "Text field is required"});
        
        const post = await Post.findById(postId);
        if (!post) return res.status(400).json({message: "Post not found"});

        const comment = {user: userId, text};

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in commentOnPost: ", error.message);  
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) return res.status(400).json({message: "Post not found"});

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost) {
            // Unlike post
            await Post.updateOne({_id:postId}, { $pull: { likes: userId }}); // In updateOne the filter needs to be an object with _id:
            res.status(200).json({message: "Post unliked successfully"});
        } else {
            // Like post
            // await Post.findByIdAndUpdate(postId, { $push: { likes: userId }});  // In findByAndUpdate the filter can be of type any
            post.likes.push(userId);
            await post.save();
            // I'm guessing we are using this push method for like and $pull metgod for unlike because there is no good mechanism to directly pop a particular element in JS
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like"
            });
            await notification.save();
            res.status(200).json({message: "Post liked successfully"});
        }

        /*
        Alternative approach
        if (post.likes.includes(userId)) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        */

    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in LikeUnlike Post: ", error.message); 
    }
}