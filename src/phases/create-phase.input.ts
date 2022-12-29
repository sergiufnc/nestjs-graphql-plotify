import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Task } from 'src/tasks/task.entity';
import { Phase } from './phase.entity';

@InputType()
export class CreatePhase extends Phase {
  // @Field()
  // id: string;

  @Field()
  phaseTitle: string;
}
