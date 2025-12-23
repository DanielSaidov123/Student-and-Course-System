import express from "express";
import { CreateCurses, DelCurse, GetCurse, GetCurses, updatingCurse } from "../controllers/Courses.js";

const router = express.Router();



router.route('/').get(GetCurses).post(CreateCurses)
router.route('/:id').get(GetCurse).put(updatingCurse).delete(DelCurse)

 



export default router;