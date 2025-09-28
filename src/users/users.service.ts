import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // The InjectRepository decorator is used to inject the User repository
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // create a new user
  async create(
    createUserDto: CreateUserInput,
    ctx: { companyId?: number; isAdmin?: boolean },
  ): Promise<User> {
    // check the companyId from the context
    const companyId = createUserDto.companyId ?? ctx.companyId;
    if (!companyId) {
      throw new NotFoundException('Company ID must be provided');
    }

    // Check if user with the same email already exists
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }
    // We will receive the user email and password from the DTO
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // We will need to hash the password before saving it to the database
    // Use bcrypt for hashing
    const newUser = this.usersRepository.create({
      ...createUserDto,
      companyId,
      role: ctx.isAdmin ? 'admin' : 'user',
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  // List all users by companyId
  findAll(companyId: number) {
    return this.usersRepository.find({ where: { companyId } });
  }
  // Find user by ID
  findById(id: number) {
    if (!id) {
      throw new NotFoundException('User ID must be provided');
    }
    return this.usersRepository.findOneBy({ id });
  }
}
