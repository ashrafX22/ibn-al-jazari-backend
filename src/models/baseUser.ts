/*
this class implements the basic PersonType fileds 
*/

import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gender } from './enums/gender.enum';

export class User {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({
    default: '$2b$10$yV79t9H2qypc.cwbrWf0AeQv0Dc7iXqVj/AsseiJMTBSTwMIQQRT2',
  })
  password: string;

  @Column()
  gender: Gender;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  googleRefreshToken: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
