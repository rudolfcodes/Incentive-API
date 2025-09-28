import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

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
  @Column()
  role: string;

  @Field()
  @Column()
  companyId: string;

  @HideField()
  @Column()
  password: string;
}
