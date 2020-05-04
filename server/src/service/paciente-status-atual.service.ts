import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteStatusAtual from '../domain/paciente-status-atual.entity';
import { PacienteStatusAtualRepository } from '../repository/paciente-status-atual.repository';

const relationshipNames = [];
relationshipNames.push('paciente');
relationshipNames.push('status');

@Injectable()
export class PacienteStatusAtualService {
  logger = new Logger('PacienteStatusAtualService');

  constructor(@InjectRepository(PacienteStatusAtualRepository) private pacienteStatusAtualRepository: PacienteStatusAtualRepository) {}

  async findById(id: string): Promise<PacienteStatusAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteStatusAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteStatusAtual>): Promise<PacienteStatusAtual | undefined> {
    return await this.pacienteStatusAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteStatusAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteStatusAtual[], number]> {
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
    return await this.pacienteStatusAtualRepository.findAndCount(options);
  }

  async save(pacienteStatusAtual: PacienteStatusAtual): Promise<PacienteStatusAtual | undefined> {
    return await this.pacienteStatusAtualRepository.save(pacienteStatusAtual);
  }

  async update(pacienteStatusAtual: PacienteStatusAtual): Promise<PacienteStatusAtual | undefined> {
    return await this.save(pacienteStatusAtual);
  }

  async delete(pacienteStatusAtual: PacienteStatusAtual): Promise<PacienteStatusAtual | undefined> {
    return await this.pacienteStatusAtualRepository.remove(pacienteStatusAtual);
  }
}
