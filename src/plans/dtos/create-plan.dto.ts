import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreatePlanDto {
  @Field()
  @IsString()
  @Length(2, 160)
  name: string;

  @Field()
  type: 'RSU' | 'OPTION_ISO' | 'OPTION_NSO' | 'PSU' | 'RSA';

  @Field()
  @IsNotEmpty()
  totalShares: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'COMPLETED';

  @Field()
  @IsNotEmpty()
  companyId: number;

  @Field({ nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  expiresAt?: Date;
}
