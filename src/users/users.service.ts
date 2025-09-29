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

  async userExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email });
    return !!user;
  }

  async create(
    createUserDto: CreateUserInput,
    ctx: { companyId?: number; isAdmin?: boolean; isSuperAdmin?: boolean },
  ): Promise<User> {
    let assignedRole: 'super_admin' | 'admin' | 'user';
    let assignedCompanyId: number | null;

    if (ctx.isSuperAdmin) {
      assignedRole = createUserDto.role || 'user';
      assignedCompanyId = createUserDto.companyId || null;
    } else if (ctx.isAdmin) {
      assignedRole = 'user';
      assignedCompanyId = ctx.companyId || null;
    } else {
      throw new NotFoundException('Only admins can create users');
    }

    if (!ctx.isSuperAdmin && !ctx.companyId) {
      throw new NotFoundException(
        'Company ID must be provided for non-super admins',
      );
    }

    if (await this.userExists(createUserDto.email)) {
      throw new NotFoundException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      companyId: assignedCompanyId,
      role: assignedRole,
      password: hashedPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  findAll(companyId?: number) {
    if (companyId) {
      return this.usersRepository.find({ where: { companyId } });
    }
    return this.usersRepository.find();
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
