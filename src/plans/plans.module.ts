import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { CompaniesModule } from '../companies/companies.module';
import { PlansService } from './plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), CompaniesModule],
  providers: [PlansService],
})
export class PlansModule {}
