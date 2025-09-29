import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { AuthInput } from './dto/auth.input';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AuthResponse)
  async login(@Args('authInput') authInput: AuthInput): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      authInput.email,
      authInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Get the full user object for JWT payload
    const fullUser = await this.userService.findByEmail(authInput.email);
    if (!fullUser) {
      throw new Error('User not found');
    }

    return {
      accessToken: (await this.authService.login(fullUser)).access_token,
    };
  }
}
