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
        // console.log(token)
        console.log('Received Token:', token);
      
        if (!token) {
          return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
      
        jwt.verify(token, secretKey, (err, user) => {
          if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ error: 'Invalid or expired token.' });
          }
      
          console.log('Authenticated User:', user); // Debug log
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
    console.log('Request body:', req.body);
     const { email, preference1, preference2, preference3, preLanguage, socialLinks } = req.body;

     if (!email || !preference1 || !preference2 || !preference3 || !preLanguage || !socialLinks) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

     try {
         const updatedUser = await User.findOneAndUpdate(
            { email },
             { preference1, preference2, preference3, preLanguage, socialLinks },
             { new: true }
         );

        if (!updatedUser) {
             return res.status(404).json({ error: "User not found. Please complete Step 1 first." });
        }
        console.log('Updated user:', updatedUser);
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

//Api to get first name and last name
app.get('/profile', authenticateToken, async (req, res) => {
  console.log('Request User:', req.user);
  try {
    // Find the user using the email in the token payload (set in `authenticateToken`)
    const user = await User.findOne({ email: req.user.email }).select('firstName lastName email');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Send back user data
    res.json({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Api to get matching users
// app.post('/find-matching-users', authenticateToken, async (req, res) => {
//   try {
//     // Ensure no JSON parsing is required here
//     console.log('Authorization:', req.headers.authorization);

//     // Get the logged-in user's email
//     const loggedInUserEmail = req.user.email;

//     // Fetch preferences of the logged-in user
//     const loggedInUser = await User.findOne({ email: loggedInUserEmail });
//     if (!loggedInUser) {
//       return res.status(404).json({ error: 'Logged-in user not found.' });
//     }

//     const { preference1, preference2, preference3, preLanguage } = loggedInUser;
//     const matchingUsers = await User.find({
//       email: { $ne: loggedInUserEmail }, // Exclude logged-in user
//       preference1: preference1,
//       preference2: preference2,
//       preference3: preference3,
//       preLanguage: preLanguage, // Include language as part of the exact match
//     }).select('firstName lastName socialLinks');

//     res.json(matchingUsers);
//   } catch (error) {
//     console.error('Error finding matching users:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.post('/find-matching-users', authenticateToken, async (req, res) => {
  try {
      const { email, fullName } = req.body;
      const loggedInUserEmail = req.user.email;

      if (email) {
          // Search by email
          const userByEmail = await User.findOne({ email }).select('firstName lastName socialLinks');
          if (userByEmail) {
              return res.json([userByEmail]);
          } else {
              return res.status(404).json({ error: 'No user found with the provided email.' });
          }
      }

      if (fullName) {
          // Search by full name
          const [firstName, lastName] = fullName.split(' ');
          const usersByName = await User.find({
              firstName: new RegExp(`^${firstName}$`, 'i'),
              lastName: new RegExp(`^${lastName}$`, 'i'),
              email: { $ne: loggedInUserEmail },
          }).select('firstName lastName socialLinks');
          if (usersByName.length > 0) {
              return res.json(usersByName);
          } else {
              return res.status(404).json({ error: 'No user found with the provided full name.' });
          }
      }

      // If no email or fullName is provided, match preferences
      const loggedInUser = await User.findOne({ email: loggedInUserEmail });
      if (!loggedInUser) {
          return res.status(404).json({ error: 'Logged-in user not found.' });
      }

      const { preference1, preference2, preference3, preLanguage } = loggedInUser;
      const matchingUsers = await User.find({
          email: { $ne: loggedInUserEmail },
          preference1: preference1,
          preference2: preference2,
          preference3: preference3,
          preLanguage: preLanguage,
      }).select('firstName lastName socialLinks');

      return res.json(matchingUsers);
  } catch (error) {
      console.error('Error finding users:', error);
      res.status(500).json({ error: 'Internal server error' });
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
