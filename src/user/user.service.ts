import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/entities/user.entity';
import { Student } from 'src/models/entities/student.entity';
import { Teacher } from 'src/models/entities/teacher.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  // Create a new User
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const student = this.userRepository.create(createUserDto);
    return this.userRepository.save(student);
  }

  // Create a new student
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  // Create a new teacher
  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  // Find a user by ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find all students
  async findAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  // Find all teachers
  async findAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }

  // Update a user
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  // Update a student
  async updateStudent(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    await this.studentRepository.update(id, updateStudentDto);
    return this.studentRepository.findOne({ where: { id } });
  }

  // Update a teacher
  async updateTeacher(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    await this.teacherRepository.update(id, updateTeacherDto);
    return this.teacherRepository.findOne({ where: { id } });
  }

  // Delete a user (student or teacher)
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

/* old
async create(data: CreateUserDto) {
const userExists = await this.prisma.user.findUnique({
  where: { email: data.email },
});
if (userExists)
  throw new HttpException('email allrady exists', HttpStatus.CONFLICT);
const User = await this.prisma.user.create({
  data,
});
return User;
}

async upsert(createUserDto: CreateUserDto) {
const { name, email, role, accessToken } = createUserDto;
console.log('user service');
return this.prisma.user.upsert({
  where: {
    email: email,
  },
  create: {
    email: email,
    name: name,
    role: role,
    accessToken: accessToken,
  },
  update: {
    name: name,
    accessToken: accessToken,
  },
});
}

async findAll(): Promise < UserEntity[] > {
const users = await this.prisma.user.findMany();
return users.map((user) => new UserEntity(user));
}

async findOne(id: number): Promise < UserEntity > {
const user = await this.prisma.user.findUnique({ where: { id } });
// if (!user)
//   throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
return new UserEntity(user);
}

async update(id: number, data: UpdateUserDto) {
const updateUser = await this.prisma.user.update({
  where: { id },
  data,
});
return updateUser;
}

async remove(id: number) {
await this.findOne(id);
const deleteUser = await this.prisma.user.delete({
  where: {
    id,
  },
});
return deleteUser;
}
}

*/