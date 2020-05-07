import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadItem from '../domain/pad-item.entity';
import { PadItemRepository } from '../repository/pad-item.repository';

const relationshipNames = [];

@Injectable()
export class PadItemService {
  logger = new Logger('PadItemService');

  constructor(@InjectRepository(PadItemRepository) private padItemRepository: PadItemRepository) {}

  async findById(id: string): Promise<PadItem | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItem>): Promise<PadItem | undefined> {
    return await this.padItemRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItem>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItem[], number]> {
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
    return await this.padItemRepository.findAndCount(options);
  }

  async save(padItem: PadItem): Promise<PadItem | undefined> {
    return await this.padItemRepository.save(padItem);
  }

  async update(padItem: PadItem): Promise<PadItem | undefined> {
    return await this.save(padItem);
  }

  async delete(padItem: PadItem): Promise<PadItem | undefined> {
    return await this.padItemRepository.remove(padItem);
  }
}
