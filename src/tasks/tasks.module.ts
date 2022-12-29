import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { PhasesService } from '../phases/phases.service';
import { PhasesResolver } from '../phases/phases.resolver';

@Module({
  imports: [InMemoryDBModule.forRoot({})],
  providers: [PhasesResolver, PhasesService, TasksResolver, TasksService]
})

export class TasksModule { }
