import { Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: Repository<Company>) {}

  // Only system admins should be able to create companies
  async create(companyData: Partial<Company>): Promise<Company> {
    const newCompany = this.companiesRepository;
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async getCompanyById(id: number): Promise<Company | null> {
    return this.companiesRepository.findOneBy({ id });
  }

  async myCompany(): Promise<Company | null> {}
}
