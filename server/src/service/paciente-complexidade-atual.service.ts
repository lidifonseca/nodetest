import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteComplexidadeAtual from '../domain/paciente-complexidade-atual.entity';
import { PacienteComplexidadeAtualRepository } from '../repository/paciente-complexidade-atual.repository';

const relationshipNames = [];

@Injectable()
export class PacienteComplexidadeAtualService {
  logger = new Logger('PacienteComplexidadeAtualService');

  constructor(
    @InjectRepository(PacienteComplexidadeAtualRepository) private pacienteComplexidadeAtualRepository: PacienteComplexidadeAtualRepository
  ) {}

  async findById(id: string): Promise<PacienteComplexidadeAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteComplexidadeAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteComplexidadeAtual>): Promise<PacienteComplexidadeAtual | undefined> {
    return await this.pacienteComplexidadeAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteComplexidadeAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteComplexidadeAtual[], number]> {
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
    return await this.pacienteComplexidadeAtualRepository.findAndCount(options);
  }

  async save(pacienteComplexidadeAtual: PacienteComplexidadeAtual): Promise<PacienteComplexidadeAtual | undefined> {
    return await this.pacienteComplexidadeAtualRepository.save(pacienteComplexidadeAtual);
  }

  async update(pacienteComplexidadeAtual: PacienteComplexidadeAtual): Promise<PacienteComplexidadeAtual | undefined> {
    return await this.save(pacienteComplexidadeAtual);
  }

  async delete(pacienteComplexidadeAtual: PacienteComplexidadeAtual): Promise<PacienteComplexidadeAtual | undefined> {
    return await this.pacienteComplexidadeAtualRepository.remove(pacienteComplexidadeAtual);
  }
}
