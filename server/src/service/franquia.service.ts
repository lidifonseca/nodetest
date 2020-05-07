import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Franquia from '../domain/franquia.entity';
import { FranquiaRepository } from '../repository/franquia.repository';

const relationshipNames = [];

@Injectable()
export class FranquiaService {
  logger = new Logger('FranquiaService');

  constructor(@InjectRepository(FranquiaRepository) private franquiaRepository: FranquiaRepository) {}

  async findById(id: string): Promise<Franquia | undefined> {
    const options = { relations: relationshipNames };
    return await this.franquiaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Franquia>): Promise<Franquia | undefined> {
    return await this.franquiaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Franquia>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Franquia[], number]> {
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
    return await this.franquiaRepository.findAndCount(options);
  }

  async save(franquia: Franquia): Promise<Franquia | undefined> {
    return await this.franquiaRepository.save(franquia);
  }

  async update(franquia: Franquia): Promise<Franquia | undefined> {
    return await this.save(franquia);
  }

  async delete(franquia: Franquia): Promise<Franquia | undefined> {
    return await this.franquiaRepository.remove(franquia);
  }
}
