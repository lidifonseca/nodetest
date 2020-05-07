import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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
