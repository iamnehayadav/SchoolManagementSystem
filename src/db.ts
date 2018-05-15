import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';
import { IBatch,IStudent,ICourse,ITeacher,ILecture,ISubject,IBatchStudentMap} from './dbI';

declare global {
    type SequelizeAttributes<T extends { [key: string]: any }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}

export const db = new Sequelize('lms','root','root',{
    host:'localhost',
    dialect:'mysql'
});

//=================================COURSE TABLE========================================================
const courseAttr : SequelizeAttributes<ICourse> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    name  : {type  : Sequelize.STRING, allowNull : false}
};

export const Course = db.define<ICourse,any>('course',courseAttr);

//=============================SUBJECT TABLE=============================================================
const subjectAttr : SequelizeAttributes<ISubject> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    name : {type  : Sequelize.STRING, allowNull : false},
    courseId : {type : Sequelize.INTEGER}
};

export const Subject = db.define<ISubject,any>('subject',subjectAttr);

Subject.belongsTo(Course);

//===========================TEACHER TABLE===============================================================
const teacherAttr : SequelizeAttributes<ITeacher> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    name : {type  : Sequelize.STRING, allowNull : false},
    subjectId : {type : Sequelize.INTEGER}
};

export const Teacher = db.define<ITeacher,any>('teacher',teacherAttr);

Teacher.belongsTo(Subject);

//=============================BATCH TABLE==============================================================
const batchAttr : SequelizeAttributes<IBatch> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    name : {type  : Sequelize.STRING, allowNull : false},
    year :{type : Sequelize.INTEGER},
    startMonth :{type  : Sequelize.STRING, allowNull : false},
    courseId : {type : Sequelize.INTEGER}
};

export const Batch = db.define<IBatch,any>('batch',batchAttr);

Batch.belongsTo(Course);

//=============================STUDENT TABLE=============================================================
const studentAttr : SequelizeAttributes<IStudent> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    name : {type  : Sequelize.STRING, allowNull : false}
};

export const Student = db.define<IStudent,any>('student',studentAttr);

//=============================MAPPING TABLE==============================================================
const mapAttr : SequelizeAttributes<IBatchStudentMap> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    studentId : {type : Sequelize.INTEGER},
    batchId : {type : Sequelize.INTEGER}
};

export const StudentBatchMap = db.define<IBatchStudentMap,any>('studentBatchMap',mapAttr);

// StudentBatchMap.belongsTo(Student);
// StudentBatchMap.belongsTo(Batch);
StudentBatchMap.belongsTo(Student, {foreignKey: 'studentId'});
StudentBatchMap.belongsTo(Batch, {foreignKey: 'batchId'});

//=========================LECTURE TABLE===================================================================
const lectureAttr : SequelizeAttributes<ILecture> = {
    id  : {type : Sequelize.INTEGER,autoIncrement : true, primaryKey : true},
    name : {type  : Sequelize.STRING, allowNull : false},
    batchId : {type : Sequelize.INTEGER},
    teacherId : {type : Sequelize.INTEGER}
};

export const Lecture = db.define<ILecture,any>('lecture',lectureAttr);

Lecture.belongsTo(Batch);
Lecture.belongsTo(Teacher);

//==========================================================================================================

Course.hasMany(Batch);
Course.hasMany(Subject);
Subject.hasMany(Teacher);
Batch.hasMany(Lecture);

// StudentBatchMap.hasMany(Batch);
// StudentBatchMap.hasMany(Student);


//============================DATABASEB SYNC=================================================================
db.sync()
    .then(()=>console.log('database sync'))
    .catch((err)=>console.log(err))
