"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
exports.db = new sequelize_1.default('lms', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
//=================================COURSE TABLE========================================================
const courseAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.default.STRING, allowNull: false }
};
exports.Course = exports.db.define('course', courseAttr);
//=============================SUBJECT TABLE=============================================================
const subjectAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.default.STRING, allowNull: false },
    courseId: { type: sequelize_1.default.INTEGER }
};
exports.Subject = exports.db.define('subject', subjectAttr);
exports.Subject.belongsTo(exports.Course);
//===========================TEACHER TABLE===============================================================
const teacherAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.default.STRING, allowNull: false },
    subjectId: { type: sequelize_1.default.INTEGER }
};
exports.Teacher = exports.db.define('teacher', teacherAttr);
exports.Teacher.belongsTo(exports.Subject);
//=============================BATCH TABLE==============================================================
const batchAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.default.STRING, allowNull: false },
    year: { type: sequelize_1.default.INTEGER },
    startMonth: { type: sequelize_1.default.STRING, allowNull: false },
    courseId: { type: sequelize_1.default.INTEGER }
};
exports.Batch = exports.db.define('batch', batchAttr);
exports.Batch.belongsTo(exports.Course);
//=============================STUDENT TABLE=============================================================
const studentAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.default.STRING, allowNull: false }
};
exports.Student = exports.db.define('student', studentAttr);
//=============================MAPPING TABLE==============================================================
const mapAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    studentId: { type: sequelize_1.default.INTEGER },
    batchId: { type: sequelize_1.default.INTEGER }
};
exports.StudentBatchMap = exports.db.define('studentBatchMap', mapAttr);
// StudentBatchMap.belongsTo(Student);
// StudentBatchMap.belongsTo(Batch);
exports.StudentBatchMap.belongsTo(exports.Student, { foreignKey: 'studentId' });
exports.StudentBatchMap.belongsTo(exports.Batch, { foreignKey: 'batchId' });
//=========================LECTURE TABLE===================================================================
const lectureAttr = {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.default.STRING, allowNull: false },
    batchId: { type: sequelize_1.default.INTEGER },
    teacherId: { type: sequelize_1.default.INTEGER }
};
exports.Lecture = exports.db.define('lecture', lectureAttr);
exports.Lecture.belongsTo(exports.Batch);
exports.Lecture.belongsTo(exports.Teacher);
//==========================================================================================================
exports.Course.hasMany(exports.Batch);
exports.Course.hasMany(exports.Subject);
exports.Subject.hasMany(exports.Teacher);
exports.Batch.hasMany(exports.Lecture);
// StudentBatchMap.hasMany(Batch);
// StudentBatchMap.hasMany(Student);
//============================DATABASEB SYNC=================================================================
exports.db.sync()
    .then(() => console.log('database sync'))
    .catch((err) => console.log(err));
