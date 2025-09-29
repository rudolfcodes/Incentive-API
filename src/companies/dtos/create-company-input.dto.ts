import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

@InputType()
export class CompanyLocationInput {
  @Field() @IsString() @Length(1, 160) address: string;
  @Field() @IsString() @Length(1, 80) city: string;
  @Field() @IsString() @Length(1, 80) postalCode: string;
  @Field() @Matches(/^[a-zA-Z\s]*$/) @IsString() country: string;
}

@InputType()
export class CreateCompanyInput {
  @Field() @IsString() @Length(3, 160) name: string;

  @Field({ nullable: true })
  @IsOptional()
  // slug must be lowercase letters, numbers, hyphens, and underscores only
  @Matches(/^[a-z0-9_-]+$/)
  @Length(3, 88)
  slug?: string;

  @Field(() => CompanyLocationInput, { nullable: true })
  @IsOptional()
  location?: CompanyLocationInput;
}
