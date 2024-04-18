import * as dao from './dao';
import model from '../UserDB/model';
import albumModel from '../Albums/model';

export default function LikeRoutes(app) {

const createLike = async (req, res) => { 
    const user = await model.findById(userId);

    let actualAlbum = await albumModel.findOne({ mbid: album.mbid });
  
    if (!actualAlbum) {
        actualAlbum.mbid = album.mbid;
        actualAlbum.name = album.name;
      // If album is not found, create a new one
      actualAlbum = await albumModel.create(album);
    }
    const like = dao.createLike(user, actualAlbum);
    await like.save();

    user.likesAlbum.push(like._id);
    actualAlbum.likedBy.push(like._id);
    
    await user.save();
    await actualAlbum.save();
}

const findAllLikes = async (req, res) => {
    const likes = await dao.findAllLikes();
    res.json(likes);
}

const findLikeById = async (req, res) => {
    const likeId = req.params.likeId;
    const like = await dao.findLikeById(likeId);
    res.json(like);

}

const findLikeByUser = async (req, res) => {
    const user = req.params.user;
    const like = await dao.findLikeByUser(user);
    res.json(like);

}

const findLikeByAlbum = async (req, res) => { 
    const album = req.params.album;
    const like = await dao.findLikeByAlbum(album);
    res.json(like);
}

const deleteLike = async (req, res) => {
    const likeId = req.params.likeId;
    const status = await dao.deleteLike(likeId);
    res.json(status);
}


app.post('/api/likes', createLike);
app.get('/api/likes', findAllLikes);
app.get('/api/likes/:likeId', findLikeById);
app.get('/api/likes/user/:user', findLikeByUser);
app.get('/api/likes/album/:album', findLikeByAlbum);
app.delete('/api/likes/:likeId', deleteLike);

}