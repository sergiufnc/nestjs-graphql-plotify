import { Injectable } from '@nestjs/common';
import { Phase } from './phase.entity';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CreatePhase } from './create-phase.input';

@Injectable()
export class PhasesService {
  constructor(
    private readonly phaseRepository: InMemoryDBService<Phase>
  ) { }

  async create(createPhaseInput: CreatePhase) {
    return await this.phaseRepository.create(createPhaseInput);
  }

  async findAll() {
    const phases = await this.phaseRepository.getAll()

    return phases.filter(phase => phase.phaseTitle);
  }

  async findOne(id: string) {
    return await this.phaseRepository.get(id);
  }
}
