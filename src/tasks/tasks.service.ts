import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CreateTask } from './create-task.input';
import { CreatePhase } from 'src/phases/create-phase.input';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: InMemoryDBService<Task>
  ) { }

  async create(createTaskInput: CreateTask) {
    return await this.taskRepository.create(createTaskInput);
  }

  async findAll() {
    return (await this.taskRepository.getAll()).filter(task => task.taskTitle);
  }

  async findOne(id: string) {
    return await this.taskRepository.get(id);
  }
}
