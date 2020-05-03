import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Periodicidade from '../domain/periodicidade.entity';
import { PeriodicidadeRepository } from '../repository/periodicidade.repository';

const relationshipNames = [];

@Injectable()
export class PeriodicidadeService {
  logger = new Logger('PeriodicidadeService');

  constructor(@InjectRepository(PeriodicidadeRepository) private periodicidadeRepository: PeriodicidadeRepository) {}

  async findById(id: string): Promise<Periodicidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.periodicidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Periodicidade>): Promise<Periodicidade | undefined> {
    return await this.periodicidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Periodicidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Periodicidade[], number]> {
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
          where += ' `Periodicidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Periodicidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.periodicidadeRepository.findAndCount(options);
  }

  async save(periodicidade: Periodicidade): Promise<Periodicidade | undefined> {
    return await this.periodicidadeRepository.save(periodicidade);
  }

  async update(periodicidade: Periodicidade): Promise<Periodicidade | undefined> {
    return await this.save(periodicidade);
  }

  async delete(periodicidade: Periodicidade): Promise<Periodicidade | undefined> {
    return await this.periodicidadeRepository.remove(periodicidade);
  }
}
