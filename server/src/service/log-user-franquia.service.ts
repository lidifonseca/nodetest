import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import LogUserFranquia from '../domain/log-user-franquia.entity';
import { LogUserFranquiaRepository } from '../repository/log-user-franquia.repository';

const relationshipNames = [];
relationshipNames.push('idAcao');
relationshipNames.push('idTela');
relationshipNames.push('idUsuario');

@Injectable()
export class LogUserFranquiaService {
  logger = new Logger('LogUserFranquiaService');

  constructor(@InjectRepository(LogUserFranquiaRepository) private logUserFranquiaRepository: LogUserFranquiaRepository) {}

  async findById(id: string): Promise<LogUserFranquia | undefined> {
    const options = { relations: relationshipNames };
    return await this.logUserFranquiaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<LogUserFranquia>): Promise<LogUserFranquia | undefined> {
    return await this.logUserFranquiaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<LogUserFranquia>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[LogUserFranquia[], number]> {
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
          where += ' `LogUserFranquia`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `LogUserFranquia`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.logUserFranquiaRepository.findAndCount(options);
  }

  async save(logUserFranquia: LogUserFranquia): Promise<LogUserFranquia | undefined> {
    return await this.logUserFranquiaRepository.save(logUserFranquia);
  }

  async update(logUserFranquia: LogUserFranquia): Promise<LogUserFranquia | undefined> {
    return await this.save(logUserFranquia);
  }

  async delete(logUserFranquia: LogUserFranquia): Promise<LogUserFranquia | undefined> {
    return await this.logUserFranquiaRepository.remove(logUserFranquia);
  }
}
