import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { CompaniesModule } from '../companies/companies.module';
import { PlansService } from './plans.service';
import { PlansResolver } from './plans.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), CompaniesModule],
  providers: [PlansService, PlansResolver],
})
export class PlansModule {}
