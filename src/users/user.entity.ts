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
  @Column({ nullable: true })
  role?: 'admin' | 'user';

  @Field()
  @Column()
  companyId: string;

  @HideField()
  @Column()
  password: string;
}
