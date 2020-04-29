import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Apenso from '../domain/apenso.entity';
import { ApensoRepository } from '../repository/apenso.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class ApensoService {
  logger = new Logger('ApensoService');

  constructor(@InjectRepository(ApensoRepository) private apensoRepository: ApensoRepository) {}

  async findById(id: string): Promise<Apenso | undefined> {
    const options = { relations: relationshipNames };
    return await this.apensoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Apenso>): Promise<Apenso | undefined> {
    return await this.apensoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Apenso>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Apenso[], number]> {
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
          where += ' `Apenso`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Apenso`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.apensoRepository.findAndCount(options);
  }

  async save(apenso: Apenso): Promise<Apenso | undefined> {
    return await this.apensoRepository.save(apenso);
  }

  async update(apenso: Apenso): Promise<Apenso | undefined> {
    return await this.save(apenso);
  }

  async delete(apenso: Apenso): Promise<Apenso | undefined> {
    return await this.apensoRepository.remove(apenso);
  }
}
