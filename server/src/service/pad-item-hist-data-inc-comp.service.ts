import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadItemHistDataIncComp from '../domain/pad-item-hist-data-inc-comp.entity';
import { PadItemHistDataIncCompRepository } from '../repository/pad-item-hist-data-inc-comp.repository';

const relationshipNames = [];

@Injectable()
export class PadItemHistDataIncCompService {
  logger = new Logger('PadItemHistDataIncCompService');

  constructor(
    @InjectRepository(PadItemHistDataIncCompRepository) private padItemHistDataIncCompRepository: PadItemHistDataIncCompRepository
  ) {}

  async findById(id: string): Promise<PadItemHistDataIncComp | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemHistDataIncCompRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemHistDataIncComp>): Promise<PadItemHistDataIncComp | undefined> {
    return await this.padItemHistDataIncCompRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemHistDataIncComp>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemHistDataIncComp[], number]> {
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
          where += ' `PadItemHistDataIncComp`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadItemHistDataIncComp`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.padItemHistDataIncCompRepository.findAndCount(options);
  }

  async save(padItemHistDataIncComp: PadItemHistDataIncComp): Promise<PadItemHistDataIncComp | undefined> {
    return await this.padItemHistDataIncCompRepository.save(padItemHistDataIncComp);
  }

  async update(padItemHistDataIncComp: PadItemHistDataIncComp): Promise<PadItemHistDataIncComp | undefined> {
    return await this.save(padItemHistDataIncComp);
  }

  async delete(padItemHistDataIncComp: PadItemHistDataIncComp): Promise<PadItemHistDataIncComp | undefined> {
    return await this.padItemHistDataIncCompRepository.remove(padItemHistDataIncComp);
  }
}
