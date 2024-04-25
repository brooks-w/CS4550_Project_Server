import albumModel from "./model.js";
import model from "../UserDB/model.js";
import { createLike } from "../Likes/dao.js";
import likesModel from "../Likes/model.js";

// export const userLikesAlbum = async (userId, album) => {
//   const user = await model.findById(userId);

//   let actualAlbum = await albumModel.findOne({ mbid: album.mbid });

//   if (!actualAlbum) {
//     actualAlbum.mbid = album.mbid;
//     actualAlbum.name = album.name;
//     actualAlbum = await albumModel.create(album);
//   }
//   user.likesAlbum.push({ album: actualAlbum._id, date: Date.now() });
//   actualAlbum.likedBy.push(user._id);

//   await user.save();
//   await actualAlbum.save();
// };

// export const userUnlikesAlbum = async (userId, mbid) => {
//   let user = await model.findById(userId);
//   let album = (await albumModel.find({ mbid: mbid })).pop();

//   await model.updateOne({ _id: userId }, { $pull: { likesAlbum: album._id } });

//   await albumModel.updateOne(
//     { _id: album._id },
//     { $pull: { likedBy: user._id } }
//   );
// };


