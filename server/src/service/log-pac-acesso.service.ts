import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import LogPacAcesso from '../domain/log-pac-acesso.entity';
import { LogPacAcessoRepository } from '../repository/log-pac-acesso.repository';

const relationshipNames = [];

@Injectable()
export class LogPacAcessoService {
  logger = new Logger('LogPacAcessoService');

  constructor(@InjectRepository(LogPacAcessoRepository) private logPacAcessoRepository: LogPacAcessoRepository) {}

  async findById(id: string): Promise<LogPacAcesso | undefined> {
    const options = { relations: relationshipNames };
    return await this.logPacAcessoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<LogPacAcesso>): Promise<LogPacAcesso | undefined> {
    return await this.logPacAcessoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<LogPacAcesso>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[LogPacAcesso[], number]> {
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
          where += ' `LogPacAcesso`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `LogPacAcesso`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.logPacAcessoRepository.findAndCount(options);
  }

  async save(logPacAcesso: LogPacAcesso): Promise<LogPacAcesso | undefined> {
    return await this.logPacAcessoRepository.save(logPacAcesso);
  }

  async update(logPacAcesso: LogPacAcesso): Promise<LogPacAcesso | undefined> {
    return await this.save(logPacAcesso);
  }

  async delete(logPacAcesso: LogPacAcesso): Promise<LogPacAcesso | undefined> {
    return await this.logPacAcessoRepository.remove(logPacAcesso);
  }
}
