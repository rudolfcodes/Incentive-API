import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Company } from '../companies/company.entity';

@ObjectType({ description: 'User entity' })
@Entity()
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ nullable: true })
  role?: 'admin' | 'user' | 'super_admin';

  // companyId is how we link users to companies
  // JoinColumn specifies that the foreign key is companyId
  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: number | null;

  @HideField()
  @Column()
  password: string;
}
