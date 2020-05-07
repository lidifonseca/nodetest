import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteDiagnostico from '../domain/paciente-diagnostico.entity';
import { PacienteDiagnosticoRepository } from '../repository/paciente-diagnostico.repository';

const relationshipNames = [];

@Injectable()
export class PacienteDiagnosticoService {
  logger = new Logger('PacienteDiagnosticoService');

  constructor(@InjectRepository(PacienteDiagnosticoRepository) private pacienteDiagnosticoRepository: PacienteDiagnosticoRepository) {}

  async findById(id: string): Promise<PacienteDiagnostico | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDiagnosticoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDiagnostico>): Promise<PacienteDiagnostico | undefined> {
    return await this.pacienteDiagnosticoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDiagnostico>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDiagnostico[], number]> {
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
    return await this.pacienteDiagnosticoRepository.findAndCount(options);
  }

  async save(pacienteDiagnostico: PacienteDiagnostico): Promise<PacienteDiagnostico | undefined> {
    return await this.pacienteDiagnosticoRepository.save(pacienteDiagnostico);
  }

  async update(pacienteDiagnostico: PacienteDiagnostico): Promise<PacienteDiagnostico | undefined> {
    return await this.save(pacienteDiagnostico);
  }

  async delete(pacienteDiagnostico: PacienteDiagnostico): Promise<PacienteDiagnostico | undefined> {
    return await this.pacienteDiagnosticoRepository.remove(pacienteDiagnostico);
  }
}
