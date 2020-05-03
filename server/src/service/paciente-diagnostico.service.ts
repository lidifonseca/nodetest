import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteDiagnostico from '../domain/paciente-diagnostico.entity';
import { PacienteDiagnosticoRepository } from '../repository/paciente-diagnostico.repository';

const relationshipNames = [];
relationshipNames.push('idPaciente');
relationshipNames.push('idCid');

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
          where += ' `PacienteDiagnostico`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteDiagnostico`.`' + element['column'] + '` = "' + element['value'] + '" ';
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
