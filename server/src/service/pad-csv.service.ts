import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadCsv from '../domain/pad-csv.entity';
import { PadCsvRepository } from '../repository/pad-csv.repository';

const relationshipNames = [];

@Injectable()
export class PadCsvService {
  logger = new Logger('PadCsvService');

  constructor(@InjectRepository(PadCsvRepository) private padCsvRepository: PadCsvRepository) {}

  async findById(id: string): Promise<PadCsv | undefined> {
    const options = { relations: relationshipNames };
    return await this.padCsvRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadCsv>): Promise<PadCsv | undefined> {
    return await this.padCsvRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadCsv>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadCsv[], number]> {
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
    return await this.padCsvRepository.findAndCount(options);
  }

  async save(padCsv: PadCsv): Promise<PadCsv | undefined> {
    return await this.padCsvRepository.save(padCsv);
  }

  async update(padCsv: PadCsv): Promise<PadCsv | undefined> {
    return await this.save(padCsv);
  }

  async delete(padCsv: PadCsv): Promise<PadCsv | undefined> {
    return await this.padCsvRepository.remove(padCsv);
  }
}
