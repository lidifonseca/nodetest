import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteDispositivoComplexidade from '../domain/paciente-dispositivo-complexidade.entity';
import { PacienteDispositivoComplexidadeRepository } from '../repository/paciente-dispositivo-complexidade.repository';

const relationshipNames = [];

@Injectable()
export class PacienteDispositivoComplexidadeService {
  logger = new Logger('PacienteDispositivoComplexidadeService');

  constructor(
    @InjectRepository(PacienteDispositivoComplexidadeRepository)
    private pacienteDispositivoComplexidadeRepository: PacienteDispositivoComplexidadeRepository
  ) {}

  async findById(id: string): Promise<PacienteDispositivoComplexidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDispositivoComplexidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDispositivoComplexidade>): Promise<PacienteDispositivoComplexidade | undefined> {
    return await this.pacienteDispositivoComplexidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDispositivoComplexidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDispositivoComplexidade[], number]> {
    options.relations = relationshipNames;
    let where = {};
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (element['operation'] === 'contains') {
          where[element['column']] = Like('%' + element['value'] + '%');
        } else if (element['operation'] === 'equals') {
          where[element['column']] = Equal(element['value']);
        }
      }
    }
    options.where = where;
    return await this.pacienteDispositivoComplexidadeRepository.findAndCount(options);
  }

  async save(pacienteDispositivoComplexidade: PacienteDispositivoComplexidade): Promise<PacienteDispositivoComplexidade | undefined> {
    return await this.pacienteDispositivoComplexidadeRepository.save(pacienteDispositivoComplexidade);
  }

  async update(pacienteDispositivoComplexidade: PacienteDispositivoComplexidade): Promise<PacienteDispositivoComplexidade | undefined> {
    return await this.save(pacienteDispositivoComplexidade);
  }

  async delete(pacienteDispositivoComplexidade: PacienteDispositivoComplexidade): Promise<PacienteDispositivoComplexidade | undefined> {
    return await this.pacienteDispositivoComplexidadeRepository.remove(pacienteDispositivoComplexidade);
  }
}
