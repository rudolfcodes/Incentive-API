import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Company } from 'src/companies/company.entity';

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
  role?: 'admin' | 'user';

  @ManyToOne(() => Company, (company) => company.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: number;

  @HideField()
  @Column()
  password: string;
}
