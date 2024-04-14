import mongoose from "mongoose";
import albumSchema from "./schema.js";

const albumModel = mongoose.model('albums', albumSchema);

export default albumModel;