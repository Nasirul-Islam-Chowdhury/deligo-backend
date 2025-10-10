import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validatioin';
import auth from '../../middleWares/auth';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenZodSchema),
    AuthController.refreshToken
);

router.post(
    '/change-password',
    validateRequest(AuthValidation.changePasswordZodSchema),
    AuthController.changePassword
);
router.post(
    '/forgot-password',
    validateRequest(AuthValidation.forgotPasswordZodSchema),
    AuthController.forgotPass
);

router.post(
    '/reset-password',
    validateRequest(AuthValidation.resetPasswordZodSchema),
    AuthController.resetPassword
);

export const AuthRoutes = router;