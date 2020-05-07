import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import DescPta from '../domain/desc-pta.entity';
import { DescPtaRepository } from '../repository/desc-pta.repository';

const relationshipNames = [];

@Injectable()
export class DescPtaService {
  logger = new Logger('DescPtaService');

  constructor(@InjectRepository(DescPtaRepository) private descPtaRepository: DescPtaRepository) {}

  async findById(id: string): Promise<DescPta | undefined> {
    const options = { relations: relationshipNames };
    return await this.descPtaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<DescPta>): Promise<DescPta | undefined> {
    return await this.descPtaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<DescPta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[DescPta[], number]> {
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
    return await this.descPtaRepository.findAndCount(options);
  }

  async save(descPta: DescPta): Promise<DescPta | undefined> {
    return await this.descPtaRepository.save(descPta);
  }

  async update(descPta: DescPta): Promise<DescPta | undefined> {
    return await this.save(descPta);
  }

  async delete(descPta: DescPta): Promise<DescPta | undefined> {
    return await this.descPtaRepository.remove(descPta);
  }
}
