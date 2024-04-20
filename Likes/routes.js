import * as dao from "./dao.js";
import model from "../UserDB/model.js";
import albumModel from "../Albums/model.js";
import likesModel from "./model.js";

export default function LikeRoutes(app) {
  const createLike = async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const user = await model.findById(userId);
    const album = req.body;

    let actualAlbum = await albumModel.findOne({ mbid: album.mbid });

    if (!actualAlbum) {
      // If album is not found, create a new one
      album._id = album.mbid;
      actualAlbum = await albumModel.create(album);
      actualAlbum.mbid = album.mbid;
      actualAlbum.name = album.name;
    }

    let id = Date.now();

    const like = dao.createLike({
      user: user._id,
      album: album.mbid,
      _id: id,
    });

    

    await user.save();
    await actualAlbum.save();
  };

  const findAllLikes = async (req, res) => {
    const likes = await dao.findAllLikes();
    res.json(likes);
  };

  const findLikeById = async (req, res) => {
    const likeId = req.params.likeId;
    const like = await dao.findLikeById(likeId);
    res.json(like);
  };

  const findLikesByUser = async (req, res) => {
    const user = req.params.user;
    const like = await dao.findLikesByUser(user);
    res.json(like);
  };

  const findLikesByAlbum = async (req, res) => {
    const album = req.params.album;
    const like = await dao.findLikesByAlbum(album);
    res.json(like);
  };

  app.get("/api/albums/:mbid/likes", async (req, res) => {
    const mbid = req.params.mbid;
    const users = await dao.findUsersWhoLikedAlbum(mbid);
    res.send(users);
  });

  app.delete("/api/likes/:mbid", async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const user = await model.findById(userId);
    const mbid = req.params.mbid;
    console.log("route userID: %s, mbid: %s", userId, mbid);
    await likesModel.deleteOne({album: mbid, user:user._id});

    res.send("Unliked");
  });

  app.post("/api/likes/", createLike);
  app.get("/api/likes", findAllLikes);
  app.get("/api/likes/:likeId", findLikeById);
  app.get("/api/likes/user/:user", findLikesByUser);
  app.get("/api/likes/album/:album", findLikesByAlbum);
}
