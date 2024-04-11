import jwt from 'jsonwebtoken';
import { expressjwt } from "express-jwt";
import config from '../config/config.js'
import User from '../models/userModel.js'
import Incident from '../models/incidentModel.js';
import helpers from '../helpers/auth.js'


const signin = async (req, res) => { 
  try {
    let user = await User.findOne({ "email": req.body.email }) 
    const token = generateToken(user);

    return  res.status(200).json({ user, token }); 
   
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: "Could not sign in" });
  }
}

const signout = (req, res) => { 
  res.clearCookie("t");
  return res.status(200).json({ 
    message: "signed out"
  }); 
}

const requireSignin = expressjwt({ 
  secret: config.jwtSecret, 
  algorithms: ["HS256"],
  userProperty: 'auth'
});

const hasAuthorization = (req, res, next) => { 
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id; 
  if (!authorized) {
    return res.status(403).json({ 
      error: "User is not authorized"
    }); 
  } 
  next();
}

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
        // You can now use the extracted token
  req.token = token;
  const userId = helpers.getTokenUserId(req.token)
  const reqUserId = req.params.userId;
  if (userId != reqUserId){
    return false;
  }
  next(); 
};

function generateToken(user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
}

export default { signin, signout, requireSignin, hasAuthorization, authorizeUser };
