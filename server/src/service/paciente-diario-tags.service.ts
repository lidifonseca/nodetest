import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteDiarioTags from '../domain/paciente-diario-tags.entity';
import { PacienteDiarioTagsRepository } from '../repository/paciente-diario-tags.repository';

const relationshipNames = [];

@Injectable()
export class PacienteDiarioTagsService {
  logger = new Logger('PacienteDiarioTagsService');

  constructor(@InjectRepository(PacienteDiarioTagsRepository) private pacienteDiarioTagsRepository: PacienteDiarioTagsRepository) {}

  async findById(id: string): Promise<PacienteDiarioTags | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDiarioTagsRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDiarioTags>): Promise<PacienteDiarioTags | undefined> {
    return await this.pacienteDiarioTagsRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDiarioTags>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDiarioTags[], number]> {
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
    return await this.pacienteDiarioTagsRepository.findAndCount(options);
  }

  async save(pacienteDiarioTags: PacienteDiarioTags): Promise<PacienteDiarioTags | undefined> {
    return await this.pacienteDiarioTagsRepository.save(pacienteDiarioTags);
  }

  async update(pacienteDiarioTags: PacienteDiarioTags): Promise<PacienteDiarioTags | undefined> {
    return await this.save(pacienteDiarioTags);
  }

  async delete(pacienteDiarioTags: PacienteDiarioTags): Promise<PacienteDiarioTags | undefined> {
    return await this.pacienteDiarioTagsRepository.remove(pacienteDiarioTags);
  }
}
