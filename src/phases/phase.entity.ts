import { ObjectType, Field, Int } from '@nestjs/graphql';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Task } from '../tasks/task.entity';

@ObjectType()
export class Phase implements InMemoryDBEntity {
  @Field()
  id: string;

  @Field()
  phaseNumber: number;

  @Field()
  phaseTitle: string;

  @Field(() => [Task])
  tasks: Task[];
}
