import mongoose from "mongoose";
import UserRoleEnum from "./user.role.enum.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 6
    },
    profileImg: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    instaLink: {
        type: String,
        default: ""
    },
    xp: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: UserRoleEnum,
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: []
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

/*
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'professor', 'club'], required: true },
    profilePicture: { type: String }, // Optional
    createdAt: { type: Date, default: Date.now },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId, 16 characters
            ref: 'User',
            default: []
        }
    ]
  });

*/