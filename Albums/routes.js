import * as dao from "./dao.js";

export default function AlbumsRoutes(app) {
  app.post("/api/likes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const album = req.body;
    const userId = currentUser._id;
    await dao.userLikesAlbum(userId, album);
    res.send("Liked");
  });

  app.delete("/api/likes/:mbid", async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const mbid = req.params.mbid;
    console.log("route userID: %s, mbid: %s", userId, mbid);
    await dao.userUnlikesAlbum(userId, mbid);
    res.send("Unliked");
  });

  app.get("/api/albums/:mbid/likes", async (req, res) => {
      const mbid = req.params.mbid;
      const users = await dao.findUsersWhoLikedAlbum(mbid);
      res.send(users);
    });
}
