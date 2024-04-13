import mongoose from "mongoose";
import albumSchema from "./shema.js";

const albumModel = mongoose.model("Albums", albumSchema);

export default albumModel;