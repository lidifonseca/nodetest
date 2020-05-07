import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Uf from '../domain/uf.entity';
import { UfRepository } from '../repository/uf.repository';

const relationshipNames = [];

@Injectable()
export class UfService {
  logger = new Logger('UfService');

  constructor(@InjectRepository(UfRepository) private ufRepository: UfRepository) {}

  async findById(id: string): Promise<Uf | undefined> {
    const options = { relations: relationshipNames };
    return await this.ufRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Uf>): Promise<Uf | undefined> {
    return await this.ufRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Uf>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Uf[], number]> {
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
    return await this.ufRepository.findAndCount(options);
  }

  async save(uf: Uf): Promise<Uf | undefined> {
    return await this.ufRepository.save(uf);
  }

  async update(uf: Uf): Promise<Uf | undefined> {
    return await this.save(uf);
  }

  async delete(uf: Uf): Promise<Uf | undefined> {
    return await this.ufRepository.remove(uf);
  }
}
