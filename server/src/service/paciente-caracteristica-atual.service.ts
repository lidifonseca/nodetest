import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteCaracteristicaAtual from '../domain/paciente-caracteristica-atual.entity';
import { PacienteCaracteristicaAtualRepository } from '../repository/paciente-caracteristica-atual.repository';

const relationshipNames = [];

@Injectable()
export class PacienteCaracteristicaAtualService {
  logger = new Logger('PacienteCaracteristicaAtualService');

  constructor(
    @InjectRepository(PacienteCaracteristicaAtualRepository)
    private pacienteCaracteristicaAtualRepository: PacienteCaracteristicaAtualRepository
  ) {}

  async findById(id: string): Promise<PacienteCaracteristicaAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteCaracteristicaAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteCaracteristicaAtual>): Promise<PacienteCaracteristicaAtual | undefined> {
    return await this.pacienteCaracteristicaAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteCaracteristicaAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteCaracteristicaAtual[], number]> {
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
    return await this.pacienteCaracteristicaAtualRepository.findAndCount(options);
  }

  async save(pacienteCaracteristicaAtual: PacienteCaracteristicaAtual): Promise<PacienteCaracteristicaAtual | undefined> {
    return await this.pacienteCaracteristicaAtualRepository.save(pacienteCaracteristicaAtual);
  }

  async update(pacienteCaracteristicaAtual: PacienteCaracteristicaAtual): Promise<PacienteCaracteristicaAtual | undefined> {
    return await this.save(pacienteCaracteristicaAtual);
  }

  async delete(pacienteCaracteristicaAtual: PacienteCaracteristicaAtual): Promise<PacienteCaracteristicaAtual | undefined> {
    return await this.pacienteCaracteristicaAtualRepository.remove(pacienteCaracteristicaAtual);
  }
}
