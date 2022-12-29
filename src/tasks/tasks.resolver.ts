import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTask } from './create-task.input';
import { CompleteTask } from './complete-task.input';
import { PhasesService } from '../phases/phases.service';
import { Phase } from 'src/phases/phase.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly phasesService: PhasesService
  ) { }

  @Mutation(() => Task)
  async createTask(@Args('createTaskInput') createTaskInput: CreateTask) {
    const phases = await this.phasesService.findAll();

    const phase = phases.find(phase => phase.phaseNumber === createTaskInput.phaseNumber);

    if (!phase) {
      throw new Error('Phase not found');
    }

    const tasks = await this.tasksService.findAll();

    const phaseTasks = tasks
      .filter(task => task.phaseNumber === phase.phaseNumber)
      .sort((a: any, b: any) => Number(a.phaseNumber) - Number(b.phaseNumber));

    const taskNumber = phaseTasks.length ? phaseTasks.length + 1 : 1;

    return this.tasksService.create({ ...createTaskInput, taskNumber, isCompleted: false });
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.tasksService.findOne(id);
  }

  @ResolveField('phase', () => Phase)
  async phase(@Parent() task: Task) {
    const { phaseNumber } = task;
    const phases = await this.phasesService.findAll();
    return phases.find(phase => phase.phaseNumber === phaseNumber);
  }

  @Mutation(() => Task)
  async completeTask(@Args('id') id: string) {
    const phases = await this.phasesService.findAll();
    const tasks = await this.tasksService.findAll();

    const foundTask = tasks.find(task => task.id === id)

    const phase = phases.find(phase => phase.phaseNumber === foundTask.phaseNumber);

    const previousTask = tasks
      .filter(task => task.phaseNumber === phase.phaseNumber)
      .sort((a: any, b: any) => Number(a.phaseNumber) - Number(b.phaseNumber))
      .find(task => task.taskNumber === foundTask.taskNumber - 1);

    if (previousTask && !previousTask.isCompleted) {
      throw new Error('Previous task not completed');
    }

    return this.tasksService.create({ ...foundTask, isCompleted: true });
  }
}
