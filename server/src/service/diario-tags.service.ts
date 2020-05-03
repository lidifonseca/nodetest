import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import DiarioTags from '../domain/diario-tags.entity';
import { DiarioTagsRepository } from '../repository/diario-tags.repository';

const relationshipNames = [];

@Injectable()
export class DiarioTagsService {
  logger = new Logger('DiarioTagsService');

  constructor(@InjectRepository(DiarioTagsRepository) private diarioTagsRepository: DiarioTagsRepository) {}

  async findById(id: string): Promise<DiarioTags | undefined> {
    const options = { relations: relationshipNames };
    return await this.diarioTagsRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<DiarioTags>): Promise<DiarioTags | undefined> {
    return await this.diarioTagsRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<DiarioTags>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[DiarioTags[], number]> {
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
          where += ' `DiarioTags`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `DiarioTags`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.diarioTagsRepository.findAndCount(options);
  }

  async save(diarioTags: DiarioTags): Promise<DiarioTags | undefined> {
    return await this.diarioTagsRepository.save(diarioTags);
  }

  async update(diarioTags: DiarioTags): Promise<DiarioTags | undefined> {
    return await this.save(diarioTags);
  }

  async delete(diarioTags: DiarioTags): Promise<DiarioTags | undefined> {
    return await this.diarioTagsRepository.remove(diarioTags);
  }
}
