import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import UserRoutes from './UserDB/routes.js';
import LikesRoutes from './likes/routes.js';
import session from 'express-session';
import "dotenv/config";

mongoose.connect('mongodb://127.0.0.1:27017/CS4550-project');

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

// const port = process.env.PORT || 4000;
UserRoutes(app);
LikesRoutes(app);
app.listen(4000)