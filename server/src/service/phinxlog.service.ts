import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Phinxlog from '../domain/phinxlog.entity';
import { PhinxlogRepository } from '../repository/phinxlog.repository';

const relationshipNames = [];

@Injectable()
export class PhinxlogService {
  logger = new Logger('PhinxlogService');

  constructor(@InjectRepository(PhinxlogRepository) private phinxlogRepository: PhinxlogRepository) {}

  async findById(id: string): Promise<Phinxlog | undefined> {
    const options = { relations: relationshipNames };
    return await this.phinxlogRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Phinxlog>): Promise<Phinxlog | undefined> {
    return await this.phinxlogRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Phinxlog>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Phinxlog[], number]> {
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
          where += ' `Phinxlog`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Phinxlog`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.phinxlogRepository.findAndCount(options);
  }

  async save(phinxlog: Phinxlog): Promise<Phinxlog | undefined> {
    return await this.phinxlogRepository.save(phinxlog);
  }

  async update(phinxlog: Phinxlog): Promise<Phinxlog | undefined> {
    return await this.save(phinxlog);
  }

  async delete(phinxlog: Phinxlog): Promise<Phinxlog | undefined> {
    return await this.phinxlogRepository.remove(phinxlog);
  }
}
