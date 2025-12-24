import express from "express";
import { CreateCurses, DelCurse, GetCurse, GetCurses, updatingCurse } from "../controllers/Courses.js";
import { GetStudentOfCurses } from "../controllers/Enrollments.js";
import { SearchCursesByName } from "../controllers/SearchAndFilter.js";

const router = express.Router();



router.route('/').get(GetCurses).post(CreateCurses)
router.route('/search').get(SearchCursesByName )
router.route('/:id').get(GetCurse).put(updatingCurse).delete(DelCurse)
router.route('/:courseId/students').get(GetStudentOfCurses)

 



export default router;