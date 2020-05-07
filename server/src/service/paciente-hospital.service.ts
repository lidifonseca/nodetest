import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteHospital from '../domain/paciente-hospital.entity';
import { PacienteHospitalRepository } from '../repository/paciente-hospital.repository';

const relationshipNames = [];

@Injectable()
export class PacienteHospitalService {
  logger = new Logger('PacienteHospitalService');

  constructor(@InjectRepository(PacienteHospitalRepository) private pacienteHospitalRepository: PacienteHospitalRepository) {}

  async findById(id: string): Promise<PacienteHospital | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteHospitalRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteHospital>): Promise<PacienteHospital | undefined> {
    return await this.pacienteHospitalRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteHospital>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteHospital[], number]> {
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
    return await this.pacienteHospitalRepository.findAndCount(options);
  }

  async save(pacienteHospital: PacienteHospital): Promise<PacienteHospital | undefined> {
    return await this.pacienteHospitalRepository.save(pacienteHospital);
  }

  async update(pacienteHospital: PacienteHospital): Promise<PacienteHospital | undefined> {
    return await this.save(pacienteHospital);
  }

  async delete(pacienteHospital: PacienteHospital): Promise<PacienteHospital | undefined> {
    return await this.pacienteHospitalRepository.remove(pacienteHospital);
  }
}
