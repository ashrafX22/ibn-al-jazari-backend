import { Student } from "src/models/entities/student.entity";
import { Teacher } from "src/models/entities/teacher.entity";
import { UpdateStudentDto } from "src/student/dto/update-student.dto";
import { UpdateTeacherDto } from "src/teacher/dto/update-teacher.dto";

export type User = Teacher | Student;
export type UpdateUserDto = UpdateStudentDto | UpdateTeacherDto;