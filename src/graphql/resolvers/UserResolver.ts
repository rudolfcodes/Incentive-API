import { Args, Int, Resolver, Query } from '@nestjs/graphql';
import { User } from '../models/User';

@Resolver(() => User)
export class UserResolver {
  constructor() {}

  @Query(() => [User], { name: 'users' })
  getUsers() {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        companyId: 'company1',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'user',
        companyId: 'company2',
      },
    ];
  }
}
