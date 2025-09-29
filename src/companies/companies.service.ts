import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    private readonly usersService: UsersService,
  ) {}

  async create(companyData: Partial<Company>): Promise<Company> {
    try {
      if (!companyData.name || companyData.name.trim() === '') {
        throw new InternalServerErrorException('Company name is required');
      }

      const existingCompany = await this.companiesRepository.findOneBy({
        name: companyData.name,
      });
      if (existingCompany) {
        throw new InternalServerErrorException(
          'Company with this name already exists',
        );
      }

      const newCompany = this.companiesRepository.create({
        ...companyData,
        isActive: companyData.isActive ?? true,
        timezone: companyData.timezone ?? 'UTC',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return await this.companiesRepository.save(newCompany);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async getCompanyById(id: number): Promise<Company | null> {
    return this.companiesRepository.findOneBy({ id });
  }

  async myCompany(userId: number): Promise<Company | null> {
    const currentUser = await this.usersService.findById(userId);
    if (!currentUser) return null;
    return this.companiesRepository.findOneBy({ id: currentUser.companyId });
  }
}
