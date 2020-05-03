import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteDiagnosticoTemp from '../domain/paciente-diagnostico-temp.entity';
import { PacienteDiagnosticoTempRepository } from '../repository/paciente-diagnostico-temp.repository';

const relationshipNames = [];

@Injectable()
export class PacienteDiagnosticoTempService {
  logger = new Logger('PacienteDiagnosticoTempService');

  constructor(
    @InjectRepository(PacienteDiagnosticoTempRepository) private pacienteDiagnosticoTempRepository: PacienteDiagnosticoTempRepository
  ) {}

  async findById(id: string): Promise<PacienteDiagnosticoTemp | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDiagnosticoTempRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDiagnosticoTemp>): Promise<PacienteDiagnosticoTemp | undefined> {
    return await this.pacienteDiagnosticoTempRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDiagnosticoTemp>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDiagnosticoTemp[], number]> {
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
          where += ' `PacienteDiagnosticoTemp`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteDiagnosticoTemp`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteDiagnosticoTempRepository.findAndCount(options);
  }

  async save(pacienteDiagnosticoTemp: PacienteDiagnosticoTemp): Promise<PacienteDiagnosticoTemp | undefined> {
    return await this.pacienteDiagnosticoTempRepository.save(pacienteDiagnosticoTemp);
  }

  async update(pacienteDiagnosticoTemp: PacienteDiagnosticoTemp): Promise<PacienteDiagnosticoTemp | undefined> {
    return await this.save(pacienteDiagnosticoTemp);
  }

  async delete(pacienteDiagnosticoTemp: PacienteDiagnosticoTemp): Promise<PacienteDiagnosticoTemp | undefined> {
    return await this.pacienteDiagnosticoTempRepository.remove(pacienteDiagnosticoTemp);
  }
}
