import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User entity' })
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  companyId: string;
}
