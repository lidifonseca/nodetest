import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadMatMed from '../domain/pad-mat-med.entity';
import { PadMatMedRepository } from '../repository/pad-mat-med.repository';

const relationshipNames = [];

@Injectable()
export class PadMatMedService {
  logger = new Logger('PadMatMedService');

  constructor(@InjectRepository(PadMatMedRepository) private padMatMedRepository: PadMatMedRepository) {}

  async findById(id: string): Promise<PadMatMed | undefined> {
    const options = { relations: relationshipNames };
    return await this.padMatMedRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadMatMed>): Promise<PadMatMed | undefined> {
    return await this.padMatMedRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadMatMed>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadMatMed[], number]> {
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
          where += ' `PadMatMed`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadMatMed`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.padMatMedRepository.findAndCount(options);
  }

  async save(padMatMed: PadMatMed): Promise<PadMatMed | undefined> {
    return await this.padMatMedRepository.save(padMatMed);
  }

  async update(padMatMed: PadMatMed): Promise<PadMatMed | undefined> {
    return await this.save(padMatMed);
  }

  async delete(padMatMed: PadMatMed): Promise<PadMatMed | undefined> {
    return await this.padMatMedRepository.remove(padMatMed);
  }
}
