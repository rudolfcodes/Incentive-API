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

  async create(
    createUserDto: CreateUserInput,
    ctx: { companyId?: number; isAdmin?: boolean },
  ): Promise<User> {
    const companyId = createUserDto.companyId ?? ctx.companyId;
    if (!companyId) {
      throw new NotFoundException('Company ID must be provided');
    }

    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      companyId,
      role: ctx.isAdmin ? 'admin' : 'user',
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  findAll(companyId: number) {
    return this.usersRepository.find({ where: { companyId } });
  }

  findById(id: number) {
    if (!id) {
      throw new NotFoundException('User ID must be provided');
    }
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
