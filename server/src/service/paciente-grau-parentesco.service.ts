import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteGrauParentesco from '../domain/paciente-grau-parentesco.entity';
import { PacienteGrauParentescoRepository } from '../repository/paciente-grau-parentesco.repository';

const relationshipNames = [];

@Injectable()
export class PacienteGrauParentescoService {
  logger = new Logger('PacienteGrauParentescoService');

  constructor(
    @InjectRepository(PacienteGrauParentescoRepository) private pacienteGrauParentescoRepository: PacienteGrauParentescoRepository
  ) {}

  async findById(id: string): Promise<PacienteGrauParentesco | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteGrauParentescoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteGrauParentesco>): Promise<PacienteGrauParentesco | undefined> {
    return await this.pacienteGrauParentescoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteGrauParentesco>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteGrauParentesco[], number]> {
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
          where += ' `PacienteGrauParentesco`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteGrauParentesco`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteGrauParentescoRepository.findAndCount(options);
  }

  async save(pacienteGrauParentesco: PacienteGrauParentesco): Promise<PacienteGrauParentesco | undefined> {
    return await this.pacienteGrauParentescoRepository.save(pacienteGrauParentesco);
  }

  async update(pacienteGrauParentesco: PacienteGrauParentesco): Promise<PacienteGrauParentesco | undefined> {
    return await this.save(pacienteGrauParentesco);
  }

  async delete(pacienteGrauParentesco: PacienteGrauParentesco): Promise<PacienteGrauParentesco | undefined> {
    return await this.pacienteGrauParentescoRepository.remove(pacienteGrauParentesco);
  }
}
