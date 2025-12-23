import express from "express";
import { CreateStudent, DelStudent, GetStudens ,GetStudent, updatingSstudent} from "../controllers/Students.js";

const router = express.Router();



router.route('/').get(GetStudens).post(CreateStudent)
router.route('/:id').get(GetStudent).put(updatingSstudent).delete(DelStudent)

 



export default router;