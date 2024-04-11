import User from '../models/userModel.js'
import extend from 'lodash/extend.js'
import errorHandler from './errorController.js'
import jwt from 'jsonwebtoken';

const create = async (req, res) => {
    try {
        await user.save()
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
          password: hashedPassword
        });
       
        const newUser = await user.save();
        const token = generateToken(newUser);
        res.status(201).json({ user: newUser, token });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}


const list = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const listId = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

const read = async (req, res) =>{
    try{
        const userId = req.params.userId;

        const user = await User.findOne({_id: userId})

        if(user){
            return res.status(200).json (user);
        }
    } catch (error) {
        res.status(400).json({ error: errorHandler.getErrorMessage(error) });
    }
}

// const read = (req, res) => {
//     req.profile.hashed_password = undefined
//     req.profile.salt = undefined
//     return res.json(req.profile)
// }


const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


function generateToken(user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

export default { create, list, listId, update, remove, read}