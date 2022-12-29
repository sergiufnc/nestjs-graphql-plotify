import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

@InputType()
export class CompleteTask implements InMemoryDBEntity {
  @Field()
  id: string;
}
