import express from 'express'
import userController from '../controllers/userController.js'
import authController from '../controllers/authController.js'

const router = express.Router()
router.route('/').post(userController.create)
router.route('/').get(authController.requireSignin, userController.list)
router.route('/:userId')
.get (authController.requireSignin, userController.read)    
.put (authController.requireSignin, authController.authorizeUser, userController.update)
.delete(authController.requireSignin, authController.authorizeUser, userController.remove)

router.param('userId', userController.listId)
// router.route('/:userId').get(userController.read)
// router.route('/:userId').put(userController.update)
// router.route('/:userId').delete(userController.remove)

export default router;
