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