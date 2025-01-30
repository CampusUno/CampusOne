import mongoose from "mongoose";
import NotificationEnum from './notification.enum.js';

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: NotificationEnum,
        required: true
    },
    read: {
        type: Boolean,
        default: false 
    }
}, {timestamps: true});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;