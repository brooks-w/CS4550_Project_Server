import * as dao from "./dao.js";
import artistModel from "./model.js";

export default function ArtistRoutes(app) {
  const createArtist = async (req, res) => {
    const userId = req.session["currentUser"]._id;
    const artist = req.body;
  
    const artistSearch = await artistModel.findOne({_id: artist._id});
    //console.log(user);
    if (artistSearch) {
      res.status(400).json(
        { message: "Already exists in db" });
        return;
    }


    await artistModel.create(artist);
  };



  app.post("/api/artist/", createArtist);

}
