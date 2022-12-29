import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Phase } from 'src/phases/phase.entity';
import { Task } from './task.entity';

@InputType()
export class CreateTask extends Task {
  // @Field()
  // id: string;

  @Field()
  phaseNumber: number;

  @Field()
  taskTitle: string;
}
