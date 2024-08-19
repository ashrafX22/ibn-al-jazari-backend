/*
this class implements the basic PersonType fileds 
*/

import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gender } from './enums/gender.enum';

export class User {
  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: 'google' })
  password: string;

  @Column()
  gender: Gender;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  age: number;

  @Column()
  accessToken: string;

  @Column()
  refreshRoken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
