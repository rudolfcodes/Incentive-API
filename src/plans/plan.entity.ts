import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, registerEnumType, ID } from '@nestjs/graphql';
import { Company } from 'src/companies/company.entity';

export enum PlanType {
  OPTION_ISO = 'OPTION_ISO',
  OPTION_NSO = 'OPTION_NSO',
  RSU = 'RSU',
  PSU = 'PSU',
  RSA = 'RSA',
}
export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
}
export enum VestInterval {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
}

registerEnumType(PlanType, {
  name: 'PlanType',
});
registerEnumType(PlanStatus, {
  name: 'PlanStatus',
});
registerEnumType(VestInterval, {
  name: 'VestInterval',
});

@ObjectType({ description: 'Plan entity' })
@Entity()
export class Plan {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ length: 160 })
  name: string;

  @Field(() => PlanType)
  @Column()
  type: PlanType;

  @Field((type) => String)
  @Column()
  description: string;

  @Field(() => PlanStatus)
  @Column({ default: PlanStatus.ACTIVE })
  status: PlanStatus;

  @Field()
  @Index()
  @Column()
  companyId: number;
  @ManyToOne(() => Company, (company) => company.plans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  startDate: Date;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  endDate: Date;

  @Field({ nullable: true })
  @Column({ type: 'datetime', nullable: true })
  expiresAt: Date;

  @Field(() => Int)
  @Column()
  totalShares: number;
}
