import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Cidade from '../domain/cidade.entity';
import { CidadeRepository } from '../repository/cidade.repository';

const relationshipNames = [];

@Injectable()
export class CidadeService {
  logger = new Logger('CidadeService');

  constructor(@InjectRepository(CidadeRepository) private cidadeRepository: CidadeRepository) {}

  async findById(id: string): Promise<Cidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.cidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Cidade>): Promise<Cidade | undefined> {
    return await this.cidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Cidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Cidade[], number]> {
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
          where += ' `Cidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Cidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.cidadeRepository.findAndCount(options);
  }

  async save(cidade: Cidade): Promise<Cidade | undefined> {
    return await this.cidadeRepository.save(cidade);
  }

  async update(cidade: Cidade): Promise<Cidade | undefined> {
    return await this.save(cidade);
  }

  async delete(cidade: Cidade): Promise<Cidade | undefined> {
    return await this.cidadeRepository.remove(cidade);
  }
}
