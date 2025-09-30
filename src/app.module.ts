import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { Company } from './companies/company.entity';
import { Plan } from './plans/plan.entity';
import { CompaniesModule } from './companies/companies.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({
        req,
        userId: req.user?.sub ?? null,
        companyId: req.user?.companyId ?? null,
        isAdmin: req.user?.role === 'admin',
        isSuperAdmin: req.user?.role === 'super_admin',
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Company, Plan],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    CompaniesModule,
    PlansModule,
  ],
  providers: [AppService],
})
export class AppModule {}
