/*
this class implements the basic PersonType fileds 
*/

import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gender } from './enums/gender.enum';

export class User {
  @Column({ unique: true, nullable: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: 'google' })
  password: string;

  @Column()
  gender: Gender;

  @Column({ default: '00000000' })
  phoneNumber: string;

  @Column({ default: '2024-08-18T22:06:04.033Z' })
  dateOfBirth: Date;

  @Column()
  age: number;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
