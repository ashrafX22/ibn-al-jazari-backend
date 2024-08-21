import { Student } from "src/models/entities/student.entity";
import { Teacher } from "src/models/entities/teacher.entity";
import { UpdateStudentDto } from "src/student/dto/update-student.dto";
import { UpdateTeacherDto } from "src/teacher/dto/update-teacher.dto";
import { StudentEntity } from "src/student/entities/student.entity";
import { TeacherEntity } from "src/teacher/entities/teacher.entity";

export type User = Teacher | Student;
export type UpdateUserDto = UpdateStudentDto | UpdateTeacherDto;
export type UserEntity = TeacherEntity | StudentEntity;