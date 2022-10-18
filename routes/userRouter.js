import * as express from 'express';

import userCtrl from '../controllers/userCtrl.js';

const router = express.Router();

// Register User
router.post('/register', userCtrl.registerUser);
// Login User
router.post('/login', userCtrl.loginUser);

// verify Token
router.get('/verify', userCtrl.verifiedToken);

export default router;
