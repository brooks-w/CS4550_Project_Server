import model from './model.js';

export const createLike = (like) => {
    delete like._id;
    return model.create(like);
}
export const findAllLikes = () => model.find();
export const findLikeById = (likeId) => model.findById(likeId);
export const findLikeByUser = (user) => model.findOne({user: user});
export const findLikeByAlbum = (album) => model.findOne({album: album});
export const deleteLike = (likeId) => model.deleteOne({_id: likeId});
