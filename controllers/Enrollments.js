import {
  readStudents,
  writeStudents,
  readCourses,
  writeCourses,
  getNextId,
} from "../utils/index.js";

export const x = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const curseslist = await readCourses();
    const studentlist = await readCourses();
    const curses = curseslist.find((s) => s.id == studentId);
    if (!curses) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    
    res.status(200).send(curses);
  } catch (err) {
    res.status(500).send(err);
  }
};
