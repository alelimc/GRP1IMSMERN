import express from 'express'
//import incidentController from '../controllers/incidentController'
import authController from '../controllers/authController.js'
import incidentController from '../controllers/incidentController.js'

const router = express.Router()

router.route('/').post(authController.requireSignin, incidentController.create);
router.route('/:incidentId')
.get(authController.requireSignin, incidentController.read)
// .put(authController.requireSignin, authController.authorizeUser, incidentController.update)
// .delete(authController.requireSignin, authController.authorizeUser, incidentController.remove)

router.route('/:incidentId/:userId')
    // .get(authController.requireSignin, incidentController.read)
    .put(authController.requireSignin, authController.authorizeUser, incidentController.update)
    .delete(authController.requireSignin, authController.authorizeUser, incidentController.remove);

// router.param('incidentId', incidentController.listByUsers)
router.route('/:userId').get(authController.requireSignin, incidentController.list)
router.route('/byUser/:userId').get(authController.authorizeUser, incidentController.listByUsers)
// router.route('/:incidentId').put(incidentController.update)
// router.route('/:incidentId').delete(incidentController.remove)

export default router;