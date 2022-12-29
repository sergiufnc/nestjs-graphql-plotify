import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Phase } from '../phases/phase.entity';

@ObjectType()
export class Task implements InMemoryDBEntity {
  @Field()
  id: string;

  @Field()
  phaseNumber: number;

  @Field()
  taskNumber: number;

  @Field()
  taskTitle: string;

  @Field()
  isCompleted: boolean;

  // add phase object to task
  @Field(() => Phase)
  phase: Phase;
}
