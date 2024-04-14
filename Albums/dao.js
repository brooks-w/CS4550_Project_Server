import albumModel from "./model.js";
import model from "../UserDB/model.js";

// export const createAlbum = (album) => albumModel.create(album);
// export const findAllAlbums = () => albumModel.find();
// export const findAlbumById = (id) => albumModel.findById(id);
// export const findAlbumByAlbumId = (albumId) => albumModel.findOne({ albumId: albumId });
// export const updateAlbum = (albumId, album) => albumModel.updateOne({ albumId }, { $set: album });
// export const deleteAlbum = (albumId) => albumModel.deleteOne({ albumId });

export const userLikesAlbum = async (userId, album) => {
  const user = await model.findById(userId);
  console.log("album object from albumdao: ", album);
  console.log("user object from albumdao: ", user);

  let actualAlbum = await albumModel.findOne({ mbid: album.mbid });
  console.log("actualAlbum object from albumdao BEFORE create: ", actualAlbum);

  if (!actualAlbum) {
    // If album is not found, create a new one
    actualAlbum = await albumModel.create(album);
    actualAlbum.mbid = album.mbid;
    actualAlbum.name = album.name;
  }
  user.likesAlbum.push(actualAlbum._id);
  actualAlbum.likedBy.push(user._id);

  console.log("actualAlbum object from albumdao AFTER create: ", actualAlbum);

  await user.save();
  await actualAlbum.save();
};

export const userUnlikesAlbum = async (userId, mbid) => {
  let user = await model.findById(userId);
  let album = (await albumModel.find({ mbid: mbid })).pop();

  console.log("album object from modelDao Unlikes: ", album);

  console.log("album _id from modelDao Unlikes: ", album._id);
  console.log("user _id from modelDao Unlikes: ", user._id);

  //   user.likesAlbum = user.likesAlbum.filter((id) => id != album._id);
  //   album.likedBy = album.likedBy.filter((id) => id != user._id);

  //   console.log("album object from modelDao Unlikes BEFORE save: ", album);
  //   console.log("user object from modelDao Unlikes BEFORE save: ", user);
  //   await user.save();
  //   await album.save();

  await model.updateOne({ _id: userId }, { $pull: { likesAlbum: album._id } });

  await albumModel.updateOne(
    { _id: album._id },
    { $pull: { likedBy: user._id } }
  );

  console.log("album object from modelDao Unlikes AFTER save: ", album);
  console.log("user object from modelDao Unlikes AFTER save: ", user);
};

// export const findUsersWhoLikedAlbum = async (mbid) => {
//   const album = (await albumModel.find({ mbid: mbid })).pop();
// let userList = [];

// for(let i = 0; i < album.likedBy.length; i++) {
//     userList.push(model.findById(album.likedBy[i]))
// }



//   return userList;
// };

export const findUsersWhoLikedAlbum = async (mbid) => {
    const album = await ((await albumModel.find({ mbid: mbid })).pop().populate("likedBy"));

    console.log("findUsersWhoLikedAlbum album after populate: ", album);


    return album.likedBy;
  };