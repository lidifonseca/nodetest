import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Periodo from '../domain/periodo.entity';
import { PeriodoRepository } from '../repository/periodo.repository';

const relationshipNames = [];

@Injectable()
export class PeriodoService {
  logger = new Logger('PeriodoService');

  constructor(@InjectRepository(PeriodoRepository) private periodoRepository: PeriodoRepository) {}

  async findById(id: string): Promise<Periodo | undefined> {
    const options = { relations: relationshipNames };
    return await this.periodoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Periodo>): Promise<Periodo | undefined> {
    return await this.periodoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Periodo>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Periodo[], number]> {
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
          where += ' `Periodo`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Periodo`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.periodoRepository.findAndCount(options);
  }

  async save(periodo: Periodo): Promise<Periodo | undefined> {
    return await this.periodoRepository.save(periodo);
  }

  async update(periodo: Periodo): Promise<Periodo | undefined> {
    return await this.save(periodo);
  }

  async delete(periodo: Periodo): Promise<Periodo | undefined> {
    return await this.periodoRepository.remove(periodo);
  }
}
