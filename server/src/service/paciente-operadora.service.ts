import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteOperadora from '../domain/paciente-operadora.entity';
import { PacienteOperadoraRepository } from '../repository/paciente-operadora.repository';

const relationshipNames = [];
relationshipNames.push('paciente');
relationshipNames.push('operadora');

@Injectable()
export class PacienteOperadoraService {
  logger = new Logger('PacienteOperadoraService');

  constructor(@InjectRepository(PacienteOperadoraRepository) private pacienteOperadoraRepository: PacienteOperadoraRepository) {}

  async findById(id: string): Promise<PacienteOperadora | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteOperadoraRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteOperadora>): Promise<PacienteOperadora | undefined> {
    return await this.pacienteOperadoraRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteOperadora>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteOperadora[], number]> {
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
    return await this.pacienteOperadoraRepository.findAndCount(options);
  }

  async save(pacienteOperadora: PacienteOperadora): Promise<PacienteOperadora | undefined> {
    return await this.pacienteOperadoraRepository.save(pacienteOperadora);
  }

  async update(pacienteOperadora: PacienteOperadora): Promise<PacienteOperadora | undefined> {
    return await this.save(pacienteOperadora);
  }

  async delete(pacienteOperadora: PacienteOperadora): Promise<PacienteOperadora | undefined> {
    return await this.pacienteOperadoraRepository.remove(pacienteOperadora);
  }
}
