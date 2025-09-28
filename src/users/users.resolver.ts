import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dtos/create-user.dto';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver((of) => User)
//@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Context() ctx: { companyId?: number; isAdmin?: boolean },
  ): Promise<User> {
    return this.usersService.create(createUserInput, ctx);
  }

  @Query(() => [User])
  async getUsers(@Context() ctx: { companyId?: number; isAdmin?: boolean }) {
    if (!ctx.companyId) return [];
    return this.usersService.findAll(ctx.companyId);
  }
}
