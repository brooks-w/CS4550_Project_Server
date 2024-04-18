import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    album: { ref: 'Albums', type: mongoose.Schema.Types.ObjectId },
    user: { ref: 'usersDB', type: mongoose.Schema.Types.ObjectId },
    date: { type: Date },
}, {
    collection:
        "likes"
},
);

export default likeSchema;