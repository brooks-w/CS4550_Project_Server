import mongoose from "mongoose";
import artistSchema from "./schema.js";

const artistModel = mongoose.model('artists', artistSchema);

export default artistModel;