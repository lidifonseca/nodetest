import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import FranquiaStatusAtual from '../domain/franquia-status-atual.entity';
import { FranquiaStatusAtualRepository } from '../repository/franquia-status-atual.repository';

const relationshipNames = [];
relationshipNames.push('idFranquia');

@Injectable()
export class FranquiaStatusAtualService {
  logger = new Logger('FranquiaStatusAtualService');

  constructor(@InjectRepository(FranquiaStatusAtualRepository) private franquiaStatusAtualRepository: FranquiaStatusAtualRepository) {}

  async findById(id: string): Promise<FranquiaStatusAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.franquiaStatusAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<FranquiaStatusAtual>): Promise<FranquiaStatusAtual | undefined> {
    return await this.franquiaStatusAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<FranquiaStatusAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[FranquiaStatusAtual[], number]> {
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
          where += ' `FranquiaStatusAtual`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `FranquiaStatusAtual`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.franquiaStatusAtualRepository.findAndCount(options);
  }

  async save(franquiaStatusAtual: FranquiaStatusAtual): Promise<FranquiaStatusAtual | undefined> {
    return await this.franquiaStatusAtualRepository.save(franquiaStatusAtual);
  }

  async update(franquiaStatusAtual: FranquiaStatusAtual): Promise<FranquiaStatusAtual | undefined> {
    return await this.save(franquiaStatusAtual);
  }

  async delete(franquiaStatusAtual: FranquiaStatusAtual): Promise<FranquiaStatusAtual | undefined> {
    return await this.franquiaStatusAtualRepository.remove(franquiaStatusAtual);
  }
}
