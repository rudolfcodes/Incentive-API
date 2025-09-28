import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({
        req,
        companyId: req.user?.companyId ?? null,
        isAdmin: req.user?.role === 'admin',
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
