import express,{Request,Response} from 'express';
import path from 'path';
import batchRoute from './routes/batch';
import courseRoute from './routes/course';
import subjectRoute from './routes/subject';
import studentRoute from './routes/student';
import teacherRoute from './routes/teacher';
import lectureRoute from './routes/lecture';
import studentbatchmapRoute from './routes/studentbatchmap';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/',express.static(path.join(__dirname,'public')));

const routes = {
    batches: batchRoute,
    courses : courseRoute,
    subjects : subjectRoute,
    students : studentRoute,
    teachers : teacherRoute,
    lectures : lectureRoute,
    studentbatches : studentbatchmapRoute
  }

app.get('/',(req,res)=>{res.send("Welcome !!!")});

app.use('/courses',routes.courses);

app.use('/batches', routes.batches);

app.use('/subjects',routes.subjects);

app.use('/students',routes.students);

app.use('/teachers',routes.teachers);

app.use('/lectures',routes.lectures);

app.use('/studentbatches',routes.studentbatches);

app.listen(5000);