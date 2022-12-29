import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhasesModule } from './phases/phases.module';
import { TasksModule } from './tasks/tasks.module';

// Followed by this guide: https://docs.nestjs.com/graphql/quick-start
@Module({
  imports: [
    InMemoryDBModule.forRoot({}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    PhasesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
