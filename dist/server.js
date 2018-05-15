"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const batch_1 = __importDefault(require("./routes/batch"));
const course_1 = __importDefault(require("./routes/course"));
const subject_1 = __importDefault(require("./routes/subject"));
const student_1 = __importDefault(require("./routes/student"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const lecture_1 = __importDefault(require("./routes/lecture"));
const studentbatchmap_1 = __importDefault(require("./routes/studentbatchmap"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
const routes = {
    batches: batch_1.default,
    courses: course_1.default,
    subjects: subject_1.default,
    students: student_1.default,
    teachers: teacher_1.default,
    lectures: lecture_1.default,
    studentbatches: studentbatchmap_1.default
};
app.get('/', (req, res) => { res.send("Welcome !!!"); });
app.use('/courses', routes.courses);
app.use('/batches', routes.batches);
app.use('/subjects', routes.subjects);
app.use('/students', routes.students);
app.use('/teachers', routes.teachers);
app.use('/lectures', routes.lectures);
app.use('/studentbatches', routes.studentbatches);
app.listen(5000);
