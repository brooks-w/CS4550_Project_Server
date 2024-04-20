import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    album: { ref: 'Albums', type: String },
    user: { ref: 'usersDB', type: mongoose.Schema.Types.ObjectId },
    _id: { type: Date },

}, {
    collection:
        "likes"
},
);

export default likeSchema;