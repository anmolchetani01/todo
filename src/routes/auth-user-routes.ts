import {Router} from 'express';
import * as authUserHandler from '../handler/auth-user-handler';


const router = Router();

router.route("/").post(authUserHandler.register);

router.route('/verify').post(authUserHandler.verifyRegisteredOtp);

// router.route('/sendotp').post(authUserHandler.sendOtp);

router.route('/login').post(authUserHandler.login);

// router.route('/logout').post(authUserHandler.logout);






export default router;