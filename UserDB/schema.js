import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['ADMIN', 'ARTIST', 'LISTENER'],
    },
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    favSong: {type: String},
    favArtist: {type: String},
    claimedArtistMBID: {type: String}
}, {collection: 'usersDB'});

export default userSchema;