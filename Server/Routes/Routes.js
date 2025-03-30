import { Router } from "express";
import { Home, Login, Signup, verifyToken, sendUser } from "../Controllers/User.js";



const router = Router();


router.get('/home', Home);
router.post('/signup', Signup);
router.post('/login', Login);
router.get('/auth', verifyToken, sendUser);


export {router}