import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ObjectType, Int, Field } from '@nestjs/graphql';
import { Plan } from '../plans/plan.entity';

@ObjectType({ description: 'Company entity' })
@Entity()
export class Company {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 160 })
  name: string;

  @Index({ unique: true })
  @Field()
  @Column({ unique: true, length: 88 })
  slug: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  ownerId: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: 'active' | 'suspended' | 'pending' | 'deleted';

  @Field(() => String)
  @Column({ length: 3, default: 'USD' })
  currency: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  locale: string;

  @Field(() => Boolean)
  @Column()
  isActive: boolean;

  @Field(() => String)
  @Column({ length: 64, default: 'UTC' })
  timezone: string;

  @Field(() => Date)
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => Date)
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;

  // Relations
  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Plan, (plan) => plan.company)
  plans: Plan[];
}
