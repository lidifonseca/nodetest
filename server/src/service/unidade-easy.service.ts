import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import UnidadeEasy from '../domain/unidade-easy.entity';
import { UnidadeEasyRepository } from '../repository/unidade-easy.repository';

const relationshipNames = [];

@Injectable()
export class UnidadeEasyService {
  logger = new Logger('UnidadeEasyService');

  constructor(@InjectRepository(UnidadeEasyRepository) private unidadeEasyRepository: UnidadeEasyRepository) {}

  async findById(id: string): Promise<UnidadeEasy | undefined> {
    const options = { relations: relationshipNames };
    return await this.unidadeEasyRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UnidadeEasy>): Promise<UnidadeEasy | undefined> {
    return await this.unidadeEasyRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UnidadeEasy>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UnidadeEasy[], number]> {
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
          where += ' `UnidadeEasy`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `UnidadeEasy`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.unidadeEasyRepository.findAndCount(options);
  }

  async save(unidadeEasy: UnidadeEasy): Promise<UnidadeEasy | undefined> {
    return await this.unidadeEasyRepository.save(unidadeEasy);
  }

  async update(unidadeEasy: UnidadeEasy): Promise<UnidadeEasy | undefined> {
    return await this.save(unidadeEasy);
  }

  async delete(unidadeEasy: UnidadeEasy): Promise<UnidadeEasy | undefined> {
    return await this.unidadeEasyRepository.remove(unidadeEasy);
  }
}
