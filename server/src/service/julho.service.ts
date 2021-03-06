import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Julho from '../domain/julho.entity';
import { JulhoRepository } from '../repository/julho.repository';

const relationshipNames = [];

@Injectable()
export class JulhoService {
  logger = new Logger('JulhoService');

  constructor(@InjectRepository(JulhoRepository) private julhoRepository: JulhoRepository) {}

  async findById(id: string): Promise<Julho | undefined> {
    const options = { relations: relationshipNames };
    return await this.julhoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Julho>): Promise<Julho | undefined> {
    return await this.julhoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Julho>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Julho[], number]> {
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
    return await this.julhoRepository.findAndCount(options);
  }

  async save(julho: Julho): Promise<Julho | undefined> {
    return await this.julhoRepository.save(julho);
  }

  async update(julho: Julho): Promise<Julho | undefined> {
    return await this.save(julho);
  }

  async delete(julho: Julho): Promise<Julho | undefined> {
    return await this.julhoRepository.remove(julho);
  }
}
