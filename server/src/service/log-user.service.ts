import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import LogUser from '../domain/log-user.entity';
import { LogUserRepository } from '../repository/log-user.repository';

const relationshipNames = [];

@Injectable()
export class LogUserService {
  logger = new Logger('LogUserService');

  constructor(@InjectRepository(LogUserRepository) private logUserRepository: LogUserRepository) {}

  async findById(id: string): Promise<LogUser | undefined> {
    const options = { relations: relationshipNames };
    return await this.logUserRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<LogUser>): Promise<LogUser | undefined> {
    return await this.logUserRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<LogUser>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[LogUser[], number]> {
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
    return await this.logUserRepository.findAndCount(options);
  }

  async save(logUser: LogUser): Promise<LogUser | undefined> {
    return await this.logUserRepository.save(logUser);
  }

  async update(logUser: LogUser): Promise<LogUser | undefined> {
    return await this.save(logUser);
  }

  async delete(logUser: LogUser): Promise<LogUser | undefined> {
    return await this.logUserRepository.remove(logUser);
  }
}
