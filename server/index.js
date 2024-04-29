import express from "express";
import axios from "axios";
import env from "dotenv";
import cors from "cors";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import pg from "pg";
import { db } from "@vercel/postgres";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
const { Pool } = pg;
env.config();
const router = express.Router();
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true,

}));
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL ,
})
const db1= await db.connect();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      // callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ["profile", "email"], scope: ["profile", "email"],
      
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db1.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          console.log("new user");
          const newUser = await db1.query(
            "INSERT INTO users (email,image) VALUES ($1,$2)",
            [profile.email,profile.picture]
          );
          return cb(null, newUser.rows[0]);
        } else {
           console.log("old user");
          return cb(null, result.rows[0]);
         

        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/logout",(req,res,next)=>{
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
})
passport.serializeUser((user, cb) => {
  cb(null, user);
});
// Set up a route to forward requests to the Wolfram Alpha API
app.get('/conversationAPI', async (req, res) => {
    const question = encodeURIComponent(req.query.question);
    const appid= process.env.CONVERSATION_API;
const conversationID= req.query.conversationID;
    console.log(conversationID);
    if(conversationID && conversationID.length > 0){
       try {
    const response = await axios.get(`http://api.wolframalpha.com/v1/conversation.jsp?appid=${appid}&conversationid=${conversationID}&i=${question}`);
    // console.log(response.data);
    console.log("ongoing")
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Wolfram Alpha API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    }
    else{
      try {
        const response = await axios.get(`http://api.wolframalpha.com/v1/conversation.jsp?appid=${appid}&i=${question}`);
        // console.log(response.data);
        // console.log(conversationId);
        res.json(response.data);
      } catch (error) {
        console.error('Error fetching data from Wolfram Alpha API:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
     console.log(question,appid);
 
});

app.get("/login/success",async(req,res)=>{
 

  if(req.isAuthenticated()){
    const result = await db1.query("SELECT * FROM users WHERE email = $1",[req.user.email]);
    const users = result.rows[0];
    const userDetails ={
      name : users.name,
      email : users.email,
      contact : users.contact,
      address:users.address,
      image : users.image,
    }
    res.status(200).json({message:"user login",user:userDetails})
  }
  else {
    res.status(400).json({message:"not logged in "})
  }
})
app.get('/fullresult',async(req,res)=>{
 
  const question = encodeURIComponent(req.query.question);
  const appid= process.env.FULLRESULT_API;
  try {
    const response = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${appid}&input=${question}`);
    console.log(response.data);
    // console.log(conversationId);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Wolfram Alpha API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})




app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})
