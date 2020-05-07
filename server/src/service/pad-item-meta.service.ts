import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadItemMeta from '../domain/pad-item-meta.entity';
import { PadItemMetaRepository } from '../repository/pad-item-meta.repository';

const relationshipNames = [];

@Injectable()
export class PadItemMetaService {
  logger = new Logger('PadItemMetaService');

  constructor(@InjectRepository(PadItemMetaRepository) private padItemMetaRepository: PadItemMetaRepository) {}

  async findById(id: string): Promise<PadItemMeta | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemMetaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemMeta>): Promise<PadItemMeta | undefined> {
    return await this.padItemMetaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemMeta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemMeta[], number]> {
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
    return await this.padItemMetaRepository.findAndCount(options);
  }

  async save(padItemMeta: PadItemMeta): Promise<PadItemMeta | undefined> {
    return await this.padItemMetaRepository.save(padItemMeta);
  }

  async update(padItemMeta: PadItemMeta): Promise<PadItemMeta | undefined> {
    return await this.save(padItemMeta);
  }

  async delete(padItemMeta: PadItemMeta): Promise<PadItemMeta | undefined> {
    return await this.padItemMetaRepository.remove(padItemMeta);
  }
}
