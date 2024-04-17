import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        name: {type: String},
        title: {type: String},
        albumID: {type: String},
        albumId: {type: String},
        mbid: {type: String, unique: true},
        likedBy: [

            { ref: "usersDB", type: mongoose.Schema.Types.ObjectId }],
    },
    { collection: "albums" }
);

export default albumSchema;