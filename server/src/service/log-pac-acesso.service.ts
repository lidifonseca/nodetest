import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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
