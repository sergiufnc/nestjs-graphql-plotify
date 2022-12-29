import { Module } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { PhasesResolver } from './phases.resolver';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TasksService } from '../tasks/tasks.service';
import { TasksResolver } from '../tasks/tasks.resolver';

@Module({
  imports: [InMemoryDBModule.forRoot({})],
  providers: [PhasesResolver, PhasesService, TasksResolver, TasksService]
})

export class PhasesModule { }
