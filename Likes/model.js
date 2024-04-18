import mongoose from "mongoose";
import schema from "./schema.js";

const likesModel = mongoose.model('likes', schema);

export default likesModel;
