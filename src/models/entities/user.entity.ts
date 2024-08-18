import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,

} from 'typeorm';
import { Gender } from '../enums/gender.enum';

export class User {

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: 'google' })
  password: string;

  @Column()
  gender: Gender;

  @Column()
  age: number;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
