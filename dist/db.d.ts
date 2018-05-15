/// <reference types="sequelize" />
import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';
import { IBatch, IStudent, ICourse, ITeacher, ILecture, ISubject, IBatchStudentMap } from './dbI';
declare global  {
    type SequelizeAttributes<T extends {
        [key: string]: any;
    }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}
export declare const db: Sequelize.Sequelize;
export declare const Course: Sequelize.Model<ICourse, any>;
export declare const Subject: Sequelize.Model<ISubject, any>;
export declare const Teacher: Sequelize.Model<ITeacher, any>;
export declare const Batch: Sequelize.Model<IBatch, any>;
export declare const Student: Sequelize.Model<IStudent, any>;
export declare const StudentBatchMap: Sequelize.Model<IBatchStudentMap, any>;
export declare const Lecture: Sequelize.Model<ILecture, any>;
