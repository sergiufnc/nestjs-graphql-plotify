import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PhasesService } from './phases.service';
import { Phase } from './phase.entity';
import { CreatePhase } from './create-phase.input';
import { Task } from '../tasks/task.entity';
import { TasksService } from '../tasks/tasks.service';

@Resolver(() => Phase)
export class PhasesResolver {
  constructor(
    private readonly phasesService: PhasesService,
    private readonly tasksService: TasksService
  ) { }

  @Mutation(() => Phase)
  async createPhase(@Args('createPhaseInput') createPhaseInput: CreatePhase) {
    const phases = await this.phasesService.findAll();

    console.log('phases', phases)

    const phaseNumber = phases.length ? phases.length + 1 : 1;

    return this.phasesService.create({ ...createPhaseInput, phaseNumber });
  }

  @Query(() => [Phase], { name: 'phases' })
  async findAll() {
    return (await this.phasesService.findAll()).filter(phase => phase.phaseTitle);
  }

  @Query(() => Phase, { name: 'phase' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.phasesService.findOne(id);
  }

  @ResolveField('tasks', () => [Task])
  async tasks(@Parent() phase: Phase) {
    const { phaseNumber } = phase;
    const tasks = await this.tasksService.findAll();
    return tasks.filter(task => task.phaseNumber === phaseNumber);
  }
}
