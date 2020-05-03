import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadPtaTemp from '../domain/pad-pta-temp.entity';
import { PadPtaTempRepository } from '../repository/pad-pta-temp.repository';

const relationshipNames = [];

@Injectable()
export class PadPtaTempService {
  logger = new Logger('PadPtaTempService');

  constructor(@InjectRepository(PadPtaTempRepository) private padPtaTempRepository: PadPtaTempRepository) {}

  async findById(id: string): Promise<PadPtaTemp | undefined> {
    const options = { relations: relationshipNames };
    return await this.padPtaTempRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadPtaTemp>): Promise<PadPtaTemp | undefined> {
    return await this.padPtaTempRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadPtaTemp>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadPtaTemp[], number]> {
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
          where += ' `PadPtaTemp`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadPtaTemp`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.padPtaTempRepository.findAndCount(options);
  }

  async save(padPtaTemp: PadPtaTemp): Promise<PadPtaTemp | undefined> {
    return await this.padPtaTempRepository.save(padPtaTemp);
  }

  async update(padPtaTemp: PadPtaTemp): Promise<PadPtaTemp | undefined> {
    return await this.save(padPtaTemp);
  }

  async delete(padPtaTemp: PadPtaTemp): Promise<PadPtaTemp | undefined> {
    return await this.padPtaTempRepository.remove(padPtaTemp);
  }
}
