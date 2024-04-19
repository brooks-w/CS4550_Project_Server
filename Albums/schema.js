import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        name: {type: String},
        title: {type: String},
        albumID: {type: String},
        albumId: {type: String},
        mbid: {type: String, unique: true},
        _id: {type: String, unique: true},
      
    },
    { collection: "albums" }
);

export default albumSchema;
