import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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
