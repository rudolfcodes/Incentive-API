import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dtos/create-company-input.dto';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation(() => Company)
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ): Promise<Company> {
    return this.companiesService.create(createCompanyInput);
  }

  @Query(() => [Company])
  async getCompanies(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Query(() => Company, { nullable: true })
  async getCompanyById(@Args('id') id: number): Promise<Company | null> {
    return this.companiesService.getCompanyById(id);
  }

  @Query(() => Company, { nullable: true })
  async myCompany(): Promise<Company | null> {
    return this.companiesService.myCompany();
  }
}
