import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PushnotificationEnvios from '../domain/pushnotification-envios.entity';
import { PushnotificationEnviosRepository } from '../repository/pushnotification-envios.repository';

const relationshipNames = [];

@Injectable()
export class PushnotificationEnviosService {
  logger = new Logger('PushnotificationEnviosService');

  constructor(
    @InjectRepository(PushnotificationEnviosRepository) private pushnotificationEnviosRepository: PushnotificationEnviosRepository
  ) {}

  async findById(id: string): Promise<PushnotificationEnvios | undefined> {
    const options = { relations: relationshipNames };
    return await this.pushnotificationEnviosRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PushnotificationEnvios>): Promise<PushnotificationEnvios | undefined> {
    return await this.pushnotificationEnviosRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PushnotificationEnvios>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PushnotificationEnvios[], number]> {
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
          where += ' `PushnotificationEnvios`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PushnotificationEnvios`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pushnotificationEnviosRepository.findAndCount(options);
  }

  async save(pushnotificationEnvios: PushnotificationEnvios): Promise<PushnotificationEnvios | undefined> {
    return await this.pushnotificationEnviosRepository.save(pushnotificationEnvios);
  }

  async update(pushnotificationEnvios: PushnotificationEnvios): Promise<PushnotificationEnvios | undefined> {
    return await this.save(pushnotificationEnvios);
  }

  async delete(pushnotificationEnvios: PushnotificationEnvios): Promise<PushnotificationEnvios | undefined> {
    return await this.pushnotificationEnviosRepository.remove(pushnotificationEnvios);
  }
}
