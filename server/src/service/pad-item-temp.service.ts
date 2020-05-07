import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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
