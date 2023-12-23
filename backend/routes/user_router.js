import express from 'express';
import { delete_user, forget_password, get_user_login, read_all_user, read_single_user, register_user, update_user } from '../controllers/user_controller.js';
import { login_user_validation, register_user_validation, update_user_validation } from '../validation/user_validation.js';
const userRouter =express.Router();
userRouter.route('/').get(read_all_user)
userRouter.route('/:id').get(read_single_user)
userRouter.route('/user-login').post(login_user_validation, get_user_login)
userRouter.route('/forgetPassword').put(login_user_validation, forget_password)
userRouter.route('/register-user').post(register_user_validation, register_user)
userRouter.route('/update-user/:id').put(update_user_validation, update_user)
userRouter.route('/delete-user/:id').delete(delete_user)
export default userRouter;
