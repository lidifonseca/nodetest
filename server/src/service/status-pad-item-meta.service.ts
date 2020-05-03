import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import StatusPadItemMeta from '../domain/status-pad-item-meta.entity';
import { StatusPadItemMetaRepository } from '../repository/status-pad-item-meta.repository';

const relationshipNames = [];

@Injectable()
export class StatusPadItemMetaService {
  logger = new Logger('StatusPadItemMetaService');

  constructor(@InjectRepository(StatusPadItemMetaRepository) private statusPadItemMetaRepository: StatusPadItemMetaRepository) {}

  async findById(id: string): Promise<StatusPadItemMeta | undefined> {
    const options = { relations: relationshipNames };
    return await this.statusPadItemMetaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<StatusPadItemMeta>): Promise<StatusPadItemMeta | undefined> {
    return await this.statusPadItemMetaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<StatusPadItemMeta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[StatusPadItemMeta[], number]> {
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
          where += ' `StatusPadItemMeta`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `StatusPadItemMeta`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.statusPadItemMetaRepository.findAndCount(options);
  }

  async save(statusPadItemMeta: StatusPadItemMeta): Promise<StatusPadItemMeta | undefined> {
    return await this.statusPadItemMetaRepository.save(statusPadItemMeta);
  }

  async update(statusPadItemMeta: StatusPadItemMeta): Promise<StatusPadItemMeta | undefined> {
    return await this.save(statusPadItemMeta);
  }

  async delete(statusPadItemMeta: StatusPadItemMeta): Promise<StatusPadItemMeta | undefined> {
    return await this.statusPadItemMetaRepository.remove(statusPadItemMeta);
  }
}
