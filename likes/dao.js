import model from "../UserDB/model.js";
import albumModel from "../Albums/model.js";


export const userLikesAlbum = async (userId, album) => {
    const user = await model.findById(userId);
    let actualAlbum = await albumModel.findOne({ albumId: album.albumId });
    if (!actualAlbum) {
        actualAlbum = await albumModel.create(album);
    }
    user.likesAlbum.push(actualAlbum._id);
    actualAlbum.likedBy.push(user._id);
    await user.save();
    await actualAlbum.save();
};

export const userUnlikesAlbum =
    async (userId, albumId) => {
        const user = await model.findById(userId);
        const album = await albumModel.findOne({ albumID: albumId });

        user.likesAlbum = user.likesAlbum.filter((id) => id !== album._id);
        album.likedBy = album.likedBy.filter((id) => id !== user._id);
        
        await user.save();
        await album.save();
    };


export const findUsersWhoLikedAlbum = async (albumId) => {
    const album = await albumModel.findOne({ albumId }).populate("likedBy");
    return album.likedBy;
};