import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacientePush from '../domain/paciente-push.entity';
import { PacientePushRepository } from '../repository/paciente-push.repository';

const relationshipNames = [];
relationshipNames.push('idPaciente');

@Injectable()
export class PacientePushService {
  logger = new Logger('PacientePushService');

  constructor(@InjectRepository(PacientePushRepository) private pacientePushRepository: PacientePushRepository) {}

  async findById(id: string): Promise<PacientePush | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacientePushRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacientePush>): Promise<PacientePush | undefined> {
    return await this.pacientePushRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacientePush>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacientePush[], number]> {
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
          where += ' `PacientePush`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacientePush`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacientePushRepository.findAndCount(options);
  }

  async save(pacientePush: PacientePush): Promise<PacientePush | undefined> {
    return await this.pacientePushRepository.save(pacientePush);
  }

  async update(pacientePush: PacientePush): Promise<PacientePush | undefined> {
    return await this.save(pacientePush);
  }

  async delete(pacientePush: PacientePush): Promise<PacientePush | undefined> {
    return await this.pacientePushRepository.remove(pacientePush);
  }
}
