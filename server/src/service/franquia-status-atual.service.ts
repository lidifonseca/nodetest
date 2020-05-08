import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import FranquiaStatusAtual from '../domain/franquia-status-atual.entity';
import { FranquiaStatusAtualRepository } from '../repository/franquia-status-atual.repository';

const relationshipNames = [];
relationshipNames.push('franquia');

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
