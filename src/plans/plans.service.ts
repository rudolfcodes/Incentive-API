import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dtos/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  async create(planData: CreatePlanDto, companyId: number): Promise<Plan> {
    const newPlan = this.plansRepository.create({
      name: planData.name,
      type: planData.type,
      description: planData.description ?? '',
      totalShares: planData.totalShares,
      startDate: planData.startDate ?? new Date(),
      companyId,
    });
    try {
      return await this.plansRepository.save(newPlan);
    } catch (error) {
      console.log('Plan creation error:', error);
      throw new Error(`Failed to create plan: ${error.message}`);
    }
  }
  async findAll(): Promise<Plan[]> {
    return this.plansRepository.find();
  }
  async findPlanById(id: number): Promise<Plan | null> {
    return this.plansRepository.findOneBy({ id });
  }
}
