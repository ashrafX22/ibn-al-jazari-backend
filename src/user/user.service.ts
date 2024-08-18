import { Student } from "src/models/entities/student.entity";
import { Teacher } from "src/models/entities/teacher.entity";
import { User } from "src/models/entities/user.entity";

export interface IUser {
    findByEmail(email: string): Promise<Student | Teacher | null>;
    update(id: number, updateUserDto: Partial<User>): Promise<Student | Teacher | null>;
}