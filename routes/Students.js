import express from "express";
import { CreateStudent, DelStudent, GetStudens ,GetStudent, updatingSstudent} from "../controllers/Students.js";
import { AddingCourseToStudent, RemoveStudentFromCourse } from "../controllers/Enrollments.js";

const router = express.Router();



router.route('/').get(GetStudens).post(CreateStudent)
router.route('/:id').get(GetStudent).put(updatingSstudent).delete(DelStudent)
router.route('/:studentId/enroll/:courseId').post(AddingCourseToStudent).delete(RemoveStudentFromCourse)
router.route('/:studentId/courses').post()

 



export default router;