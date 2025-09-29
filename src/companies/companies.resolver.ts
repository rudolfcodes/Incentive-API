import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dtos/create-company-input.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard, SuperAdminGuard } from 'src/auth/gql-auth.guard';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Mutation(() => Company)
  @UseGuards(SuperAdminGuard)
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ): Promise<Company> {
    return this.companiesService.create(createCompanyInput);
  }

  @Query(() => [Company])
  @UseGuards(SuperAdminGuard)
  async getCompanies(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Query(() => Company, { nullable: true })
  @UseGuards(SuperAdminGuard)
  async getCompanyById(@Args('id') id: number): Promise<Company | null> {
    return this.companiesService.getCompanyById(id);
  }

  @Query(() => Company, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async myCompany(@Context() ctx: { userId: number }): Promise<Company | null> {
    const { userId } = ctx;
    return this.companiesService.myCompany(userId);
  }
}
