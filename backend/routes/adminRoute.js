import express from 'express'
import userController from '../controllers/userController.js'
import authController from '../controllers/authController.js'
import incidentController from '../controllers/incidentController.js'

const router = express.Router()
router.route('/users').post(userController.create)
router.route('/users').get(authController.requireSignin, userController.list)
router.route('/users/:userId')
.get (authController.requireSignin, userController.read)    
.put (authController.requireSignin, authController.hasAuthorization, userController.update)
.delete(authController.requireSignin, authController.hasAuthorization, userController.remove)


router.route('/incidents').get(authController.requireSignin, incidentController.list)
router.route('/incidents').post(authController.requireSignin, incidentController.create);
// router.param('userId', userController.listId)
// router.route('/:userId').get(userController.read)
// router.route('/:userId').put(userController.update)
// router.route('/:userId').delete(userController.remove)

export default router;

