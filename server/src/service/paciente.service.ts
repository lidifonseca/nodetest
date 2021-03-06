import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Paciente from '../domain/paciente.entity';
import { PacienteRepository } from '../repository/paciente.repository';

const relationshipNames = [];
relationshipNames.push('unidade');
relationshipNames.push('franquia');
relationshipNames.push('cidade');
relationshipNames.push('cidadeFamiliar');
relationshipNames.push('grauParentesco');
relationshipNames.push('profissionalPref');
relationshipNames.push('tipohospital');

@Injectable()
export class PacienteService {
  logger = new Logger('PacienteService');

  constructor(@InjectRepository(PacienteRepository) private pacienteRepository: PacienteRepository) {}

  async findById(id: string): Promise<Paciente | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Paciente>): Promise<Paciente | undefined> {
    return await this.pacienteRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Paciente>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Paciente[], number]> {
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
    return await this.pacienteRepository.findAndCount(options);
  }

  async save(paciente: Paciente): Promise<Paciente | undefined> {
    return await this.pacienteRepository.save(paciente);
  }

  async update(paciente: Paciente): Promise<Paciente | undefined> {
    return await this.save(paciente);
  }

  async delete(paciente: Paciente): Promise<Paciente | undefined> {
    return await this.pacienteRepository.remove(paciente);
  }
}
