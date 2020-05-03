import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteEnqueteApp from '../domain/paciente-enquete-app.entity';
import { PacienteEnqueteAppRepository } from '../repository/paciente-enquete-app.repository';

const relationshipNames = [];
relationshipNames.push('idPaciente');

@Injectable()
export class PacienteEnqueteAppService {
  logger = new Logger('PacienteEnqueteAppService');

  constructor(@InjectRepository(PacienteEnqueteAppRepository) private pacienteEnqueteAppRepository: PacienteEnqueteAppRepository) {}

  async findById(id: string): Promise<PacienteEnqueteApp | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteEnqueteAppRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteEnqueteApp>): Promise<PacienteEnqueteApp | undefined> {
    return await this.pacienteEnqueteAppRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteEnqueteApp>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteEnqueteApp[], number]> {
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
          where += ' `PacienteEnqueteApp`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteEnqueteApp`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteEnqueteAppRepository.findAndCount(options);
  }

  async save(pacienteEnqueteApp: PacienteEnqueteApp): Promise<PacienteEnqueteApp | undefined> {
    return await this.pacienteEnqueteAppRepository.save(pacienteEnqueteApp);
  }

  async update(pacienteEnqueteApp: PacienteEnqueteApp): Promise<PacienteEnqueteApp | undefined> {
    return await this.save(pacienteEnqueteApp);
  }

  async delete(pacienteEnqueteApp: PacienteEnqueteApp): Promise<PacienteEnqueteApp | undefined> {
    return await this.pacienteEnqueteAppRepository.remove(pacienteEnqueteApp);
  }
}
