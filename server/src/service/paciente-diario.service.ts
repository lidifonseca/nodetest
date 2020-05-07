import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteDiario from '../domain/paciente-diario.entity';
import { PacienteDiarioRepository } from '../repository/paciente-diario.repository';

const relationshipNames = [];

@Injectable()
export class PacienteDiarioService {
  logger = new Logger('PacienteDiarioService');

  constructor(@InjectRepository(PacienteDiarioRepository) private pacienteDiarioRepository: PacienteDiarioRepository) {}

  async findById(id: string): Promise<PacienteDiario | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDiarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDiario>): Promise<PacienteDiario | undefined> {
    return await this.pacienteDiarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDiario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDiario[], number]> {
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
    return await this.pacienteDiarioRepository.findAndCount(options);
  }

  async save(pacienteDiario: PacienteDiario): Promise<PacienteDiario | undefined> {
    return await this.pacienteDiarioRepository.save(pacienteDiario);
  }

  async update(pacienteDiario: PacienteDiario): Promise<PacienteDiario | undefined> {
    return await this.save(pacienteDiario);
  }

  async delete(pacienteDiario: PacienteDiario): Promise<PacienteDiario | undefined> {
    return await this.pacienteDiarioRepository.remove(pacienteDiario);
  }
}
