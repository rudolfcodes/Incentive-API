import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  getUsers() {
    return this.usersService.findAll(1); // Temporary companyId
  }
}
