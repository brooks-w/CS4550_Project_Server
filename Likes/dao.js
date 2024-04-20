import likesModel from "./model.js";
import model from "../UserDB/model.js";

export const createLike = (like) => {
  return likesModel.create(like);
};
export const findAllLikes = () => likesModel.find();
export const findLikeById = (likeId) => likesModel.findById(likeId);
export const findLikesByUser = (user) => likesModel.find({ user: user });
export const findLikesByAlbum = (album) => likesModel.find({ album: album });
export const deleteLike = (likeId) => likesModel.deleteOne({ _id: likeId });

export const findUsersWhoLikedAlbum = async (albumID) => {
  try {
    const albumLikes = await findLikesByAlbum(albumID);
    console.log("findUsersWhoLikedAlbum albumLikes: ", albumLikes);

    if (albumLikes.length > 0) {
      const userPromises = albumLikes.map(async (like) => {
        const user = await model.findById(like.user);
        console.log("findUsersWhoLikedAlbum like.populatedUser: ", user);
        return user;
      });

      const userList = await Promise.all(userPromises);
      console.log("UserList: ", userList);
      return userList;
    }

    return []; // Return an empty array if no likes found
  } catch (err) {
    console.log("findUsersWhoLiked: ", err);
    throw err; // Rethrow the error to be handled by the caller
  }
};
