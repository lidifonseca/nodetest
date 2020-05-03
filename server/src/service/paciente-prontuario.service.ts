import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteProntuario from '../domain/paciente-prontuario.entity';
import { PacienteProntuarioRepository } from '../repository/paciente-prontuario.repository';

const relationshipNames = [];

@Injectable()
export class PacienteProntuarioService {
  logger = new Logger('PacienteProntuarioService');

  constructor(@InjectRepository(PacienteProntuarioRepository) private pacienteProntuarioRepository: PacienteProntuarioRepository) {}

  async findById(id: string): Promise<PacienteProntuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteProntuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteProntuario>): Promise<PacienteProntuario | undefined> {
    return await this.pacienteProntuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteProntuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteProntuario[], number]> {
    options.relations = relationshipNames;
    let where = '';
    let first = true;
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (!first) {
          where += 'and';
        } else {
          first = false;
        }
        if (element['operation'] === 'contains') {
          where += ' `PacienteProntuario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteProntuario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteProntuarioRepository.findAndCount(options);
  }

  async save(pacienteProntuario: PacienteProntuario): Promise<PacienteProntuario | undefined> {
    return await this.pacienteProntuarioRepository.save(pacienteProntuario);
  }

  async update(pacienteProntuario: PacienteProntuario): Promise<PacienteProntuario | undefined> {
    return await this.save(pacienteProntuario);
  }

  async delete(pacienteProntuario: PacienteProntuario): Promise<PacienteProntuario | undefined> {
    return await this.pacienteProntuarioRepository.remove(pacienteProntuario);
  }
}
