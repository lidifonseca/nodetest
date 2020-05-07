import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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
