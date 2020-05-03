import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Junho from '../domain/junho.entity';
import { JunhoRepository } from '../repository/junho.repository';

const relationshipNames = [];

@Injectable()
export class JunhoService {
  logger = new Logger('JunhoService');

  constructor(@InjectRepository(JunhoRepository) private junhoRepository: JunhoRepository) {}

  async findById(id: string): Promise<Junho | undefined> {
    const options = { relations: relationshipNames };
    return await this.junhoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Junho>): Promise<Junho | undefined> {
    return await this.junhoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Junho>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Junho[], number]> {
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
          where += ' `Junho`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Junho`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.junhoRepository.findAndCount(options);
  }

  async save(junho: Junho): Promise<Junho | undefined> {
    return await this.junhoRepository.save(junho);
  }

  async update(junho: Junho): Promise<Junho | undefined> {
    return await this.save(junho);
  }

  async delete(junho: Junho): Promise<Junho | undefined> {
    return await this.junhoRepository.remove(junho);
  }
}
