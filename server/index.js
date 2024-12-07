import express from 'express';
import User from './models/User.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';




const app = express();
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());

const salt = bcrypt.genSaltSync(10);
const secretKey = 'asddfghjiklnkntyunturgjbjw';



console.log("Hello, Nodemon!");

const uri = 'mongodb://localhost:27017/mydatabase';
mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected to Successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

    const authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)
      
        if (!token) {
          return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
      
        jwt.verify(token, secretKey, (err, user) => {
          if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ error: 'Invalid or expired token.' });
          }
      
          req.user = user;
          next();
        });
      };

app.post('/signup-step1', async (req, res)=>{
    console.log(req.body);
    const {firstName, lastName, email, password, checkPassword} = req.body;
    try{
        const newUser = await User.create({firstName, lastName, email, password:bcrypt.hashSync(password,salt), checkPassword:bcrypt.hashSync(checkPassword,salt)});
        res.json(newUser);
    }catch (e) {
        console.error(e);
        res.status(400).json({ error: "User registration failed", details: e });
    }
});
app.post('/signup-step2', async (req, res) => {
     const { email, preference1, preference2, preference3, preLanguage, socialLinks } = req.body;

     try {
         const updatedUser = await User.findOneAndUpdate(
            { email },
             { preference1, preference2, preference3, preLanguage, socialLinks }
         );

        if (!updatedUser) {
             return res.status(404).json({ error: "User not found. Please complete Step 1 first." });
        }
         res.json(updatedUser);
    } catch (e) {
         console.error(e);
         res.status(400).json({ error: "User registration failed in step 2", details: e });
     }
 });



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    const isPasswordValid = bcrypt.compareSync(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  
    jwt.sign({ email, id: user._id }, secretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, { httpOnly: true }).json({ token });
      });
  });

app.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        expires: new Date(0), // Expire the cookie immediately
    }).json({ message: 'Logged out successfully' });
});

app.put('/forgot-password', async (req, res) => {
  const { email, lastName, password } = req.body;
  try {
    const user = await User.findOne({ email, lastName });
    if (!user) {
      return res.status(404).json({ error: "User not found. Please check your email and last name." });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//Testing purpose
app.get('/signup-step2', async (req, res)=>{
    const users = await User.find()
    .sort({createdAt:-1})
    .limit(20);
    res.json(users);
})

app.get('/home-page',authenticateToken, async (req, res) => {
    console.log("hi")
    res.json({ message: `Welcome to the home page!` });
});

app.post('/home-page', async (req, res)=>{
  const {email} = req.body;
  try{
    const user = await User.findOne({email});
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.json(user);
  }catch (e) {
    console.error(e);
    res.status(400).json({ error: "User details not fetched", details: e });
}
});




app.listen(4000);
