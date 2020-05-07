import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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
