import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in getUserProfile: ", error.message);
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params;
        const me = req.user._id; // We have added this _id in the protectRoute middleware
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(me);

        if(id === me.toString()){ // Need to stringify the me as the id is a string and type needs to be matched else we get an error - Cannot read properties of undefined (reading 'includes') 
            return res.status(400).json({error: "You can't follow/unfollow yourself"});
        }
        if(!userToModify || !currentUser) {
            return res.status(404).json({error: "User not found"});
        }

        // First check if following or not
        const isfollowing = currentUser.following.includes(id);
        console.log(isfollowing);

        if(isfollowing){
            // Unfollow the user
            await User.findByIdAndUpdate(id, { $pull: { followers: me } });
            await User.findByIdAndUpdate(me, { $pull: { following: id } });
            res.status(200).json({message: "User unfollowed successfully"});
        } else {
            // Folllow the user
            await User.findByIdAndUpdate(id, { $push: { followers: me } });
            await User.findByIdAndUpdate(me, { $push: { following: id } });
            // Send notification to the user
            const newNotification = new Notification({
                type: 'follow',
                from: me,
                to: userToModify._id,
            })
            await newNotification.save();
            // TODO: return the id of the user as a response
            res.status(200).json({message: "User followed successfully"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in followUnfollowUser: ", error.message);   
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        // Remove CurrentUser and users we already follow from SuggestedUsers array

        const myUserId = req.user._id;

        // Get the myUser object with myid and following array
        // Returns an array of user objects
        const usersFollowedByMe = await User.findById(myUserId).select("following");

        // Get 10 sample users that are not me duh
        const users = await User.aggregate([
            {
                $match: {
                    _id: {$ne: myUserId} // Match ids that are $ne (not equalto) myUserId
                }
            },
            {
                $sample: {
                    size:10
                }
            } // Return a sample of 10 users
        ])
        // console.log(usersFollowedByMe);
        // console.log(users);

        // From usersFollowedByMe object select following that includes user._id (me) | Make sure it doesn't match with the aggregate 10 users
        // Meaning, from 10 users remove all those users that already have me in their following (I don't follow them)
        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id)); 
        const suggestedUsers = filteredUsers.slice(0,4);

        // Remove password users
        suggestedUsers.forEach(user => user.password=null);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in getSuggestedUsers: ", error.message);   
    }
};