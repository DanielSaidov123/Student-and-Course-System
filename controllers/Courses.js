import {
  readStudents,
  writeStudents,
  readCourses,
  writeCourses,
  getNextId,
} from "../utils/index.js";

export const GetCurses = async (req, res) => {
  try {
    res.status(200).send(await readCourses());
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const GetCurse = async (req, res) => {
  try {
    const id = req.params.id;
    const curseslist = await readCourses();
    const curses = curseslist.find((s) => s.id == id);
    if (!curses) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    res.status(200).send(curses);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const CreateCurses = async (req, res) => {
  try {
    const corseslist = await readCourses();
    const newcurse = {
      id: getNextId(corseslist),
      name: req.body.name,
      instructor: req.body.instructor,
      credits: req.body.credits,
    };
    corseslist.push(newcurse);
    await writeCourses(corseslist);
    res.status(200).send(newcurse);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const updatingCurse = async (req, res) => {
  try {
    const id = req.params.id;
    const corseslist = await readCourses();

    const curse = corseslist.find((s) => s.id == id);
    if (!curse) {
      return res.status(404).send({ msg: "curse is not defind." });
    }
    if (req.body.name) {
      curse.name = req.body.name;
    }
    if (req.body.instructor) {
      curse.instructor = req.body.instructor;
    }
    if (req.body.credits) {
      curse.credits = req.body.credits;
    }
    await writeCourses(corseslist);
    res.status(200).send(curse);
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const DelCurse = async (req, res) => {
  try {
    const id = req.params.id;
    const corseslist = await readCourses();
    const curse = corseslist.find((c) => c.id == id);

    if (!curse) {
      return res.status(404).send({ msg: "curse is not defind." });
    }
    const studentslist = await readStudents();
    for (let i = 0; i < corseslist.length; i++) {
      for (let j = 0; j < studentslist.length; j++) {
        for (let g = 0; g < studentslist[j].enrolledCourses.length; g++) {          
          if (studentslist[j].enrolledCourses[g] === corseslist[i].id) {
            return res
              .status(400)
              .send({ msg: "cannot delete course – students are registered" });
          }
        }
      }
    }
    const index = corseslist.findIndex((s) => s.id == id);
    corseslist.splice(index, 1);
    await writeCourses(corseslist);
    res.status(200).send({});
  } catch (err) {
    res.status(500).send({ err });
  }
};
