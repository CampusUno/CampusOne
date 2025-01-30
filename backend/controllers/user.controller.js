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
            res.status(200).json({message: "User followed successfully"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in followUnfollowUser: ", error.message);   
    }
}