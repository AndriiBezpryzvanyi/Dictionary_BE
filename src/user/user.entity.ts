import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  second_name: string;

  @Column()
  vocabulary_id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  date_of_registration: string;

  @UpdateDateColumn()
  date_of_update: string;

  @DeleteDateColumn()
  date_of_delete: string;
}
