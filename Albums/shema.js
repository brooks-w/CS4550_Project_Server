import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        name: String,
        albumID: String,
        likedBy: [

            { ref: "usersDB", type: mongoose.Schema.Types.ObjectId }],
    },
    { collection: "albums" }
);

export default albumSchema;
