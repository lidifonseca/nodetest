import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import DescPta from '../domain/desc-pta.entity';
import { DescPtaRepository } from '../repository/desc-pta.repository';

const relationshipNames = [];

@Injectable()
export class DescPtaService {
  logger = new Logger('DescPtaService');

  constructor(@InjectRepository(DescPtaRepository) private descPtaRepository: DescPtaRepository) {}

  async findById(id: string): Promise<DescPta | undefined> {
    const options = { relations: relationshipNames };
    return await this.descPtaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<DescPta>): Promise<DescPta | undefined> {
    return await this.descPtaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<DescPta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[DescPta[], number]> {
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
          where += ' `DescPta`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `DescPta`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.descPtaRepository.findAndCount(options);
  }

  async save(descPta: DescPta): Promise<DescPta | undefined> {
    return await this.descPtaRepository.save(descPta);
  }

  async update(descPta: DescPta): Promise<DescPta | undefined> {
    return await this.save(descPta);
  }

  async delete(descPta: DescPta): Promise<DescPta | undefined> {
    return await this.descPtaRepository.remove(descPta);
  }
}
