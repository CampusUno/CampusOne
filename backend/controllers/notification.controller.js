import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to:userId })
        .populate({
            path: "from",
            select: "username profileImg"
        });
        // If we have called this function that means we have read this notifcation and we need to update this
        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notifications);
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in getNotifications: ", error.message); 
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });

        res.status(200).json({message: "Notifications deleted successfully"});
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in getNotifications: ", error.message); 
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const id = req.params.id;
        const notification = await Notification.findById(id);

        if(!notification) return res.status(404).json({message: "Notification not found"});

        // If user not the owner of the notification
        if(notification.to.toString() !== userId.toString()) {
            return res.status(403).json({message: "You are not allowed to delete this notification"});
        }

        await Notification.findByIdAndDelete(id);
        res.status(200).json({message: "Notifications deleted successfully"});
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error "});
        console.log("Error in getNotifications: ", error.message); 
    }
};