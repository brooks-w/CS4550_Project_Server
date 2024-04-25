import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
    {
        name: {type: String},
        mbid: {type: String, unique: true},
        _id: {type: String, unique: true},
        albums: [{ ref: 'Albums', type: String }],
        
    },
    { collection: "artists" }
);

export default artistSchema;
