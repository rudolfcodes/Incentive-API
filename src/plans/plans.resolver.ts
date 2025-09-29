import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Plan } from './plan.entity';
import { UseGuards } from '@nestjs/common';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { PlansService } from './plans.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Plan)
export class PlansResolver {
  constructor(private plansService: PlansService) {}

  @Mutation(() => Plan)
  @UseGuards(GqlAuthGuard)
  async createPlan(
    @Args('createPlanInput') createPlan: CreatePlanDto,
    @Context() ctx: { req: any },
  ): Promise<Plan> {
    const companyId = ctx.req?.user?.companyId;
    return this.plansService.create(createPlan, companyId);
  }

  @Query(() => [Plan])
  @UseGuards(GqlAuthGuard)
  async getPlans(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  @Query(() => Plan, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPlanById(@Args('id') id: number): Promise<Plan | null> {
    return this.plansService.findPlanById(id);
  }
}
