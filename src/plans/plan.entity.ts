import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Company } from '../companies/company.entity';

@ObjectType({ description: 'Plan entity' })
@Entity()
export class Plan {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ length: 160 })
  name: string;

  @Field(() => Int)
  @Column()
  totalShares: number;

  @Field()
  @Column({ type: 'varchar', length: 20, default: 'RSU' })
  type: 'RSU' | 'OPTION_ISO' | 'OPTION_NSO' | 'PSU' | 'RSA';

  @Field((type) => String)
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ type: 'varchar', length: 20, default: 'ACTIVE' })
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'COMPLETED';

  @Field()
  @Index()
  @Column()
  companyId: number;
  @ManyToOne(() => Company, (company) => company.plans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Field(() => Date)
  @Column({ type: 'datetime', nullable: true })
  startDate?: Date;

  @Field(() => Date)
  @Column({ type: 'datetime', nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;
}
