import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadItemTemp from '../domain/pad-item-temp.entity';
import { PadItemTempRepository } from '../repository/pad-item-temp.repository';

const relationshipNames = [];

@Injectable()
export class PadItemTempService {
  logger = new Logger('PadItemTempService');

  constructor(@InjectRepository(PadItemTempRepository) private padItemTempRepository: PadItemTempRepository) {}

  async findById(id: string): Promise<PadItemTemp | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemTempRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemTemp>): Promise<PadItemTemp | undefined> {
    return await this.padItemTempRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemTemp>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemTemp[], number]> {
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
          where += ' `PadItemTemp`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadItemTemp`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.padItemTempRepository.findAndCount(options);
  }

  async save(padItemTemp: PadItemTemp): Promise<PadItemTemp | undefined> {
    return await this.padItemTempRepository.save(padItemTemp);
  }

  async update(padItemTemp: PadItemTemp): Promise<PadItemTemp | undefined> {
    return await this.save(padItemTemp);
  }

  async delete(padItemTemp: PadItemTemp): Promise<PadItemTemp | undefined> {
    return await this.padItemTempRepository.remove(padItemTemp);
  }
}
